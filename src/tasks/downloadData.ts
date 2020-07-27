import 'reflect-metadata'
import {createConnection, ConnectionOptions, Repository} from "typeorm"
import dayjs from 'dayjs'

import dbConfig from '../../ormconfig'

import rollbar from '@services/rollbar'

import asyncForEach from '@helpers/asyncForEach'
import { getManager } from 'typeorm'
import statCounter from '@helpers/statCounter'

import Display from '@models/Display'
import Platform from '@models/Platform'
import Region from '@models/Region'
import Viewport from '@models/Viewport'
import Month from '@models/Month'

type Repositories = {
  displays: Repository<Display>,
  viewports: Repository<Viewport>,
  regions: Repository<Region>,
  months: Repository<Month>,
  platforms: Repository<Platform>
}

const iterateContinents = async (platform: Platform, platformData: StatCounter.PlatformData, repositories: Repositories) => {
  const continents = Object.entries(platformData)

  await asyncForEach(continents, async (continent: [StatCounter.RegionCode, StatCounter.Result[]]) => {
    const continentCode = continent[0]
    const continentResults = continent[1]

    await iterateResults(platform, platformData, continentCode, continentResults, repositories)
  })
}


const iterateResults = async (platform: Platform, platformData: StatCounter.PlatformData, regionName: StatCounter.RegionCode, data: StatCounter.Result[], repositories: Repositories) => {
  const month = await processCurrentMonth(dayjs().month(), repositories.months)

  // Here we iterate over all the different results
  // If they are some missing displays, we create them
  // If there are missing viewports for the current month we create them, otherwise we update them
  await asyncForEach(data, async (result: StatCounter.Result) => {
    const display = await processDisplay(result.resolution, repositories.displays)
    const region = await getRegion(regionName, repositories.regions)

    if (display && region) {
      const findViewport = await repositories.viewports.findOne({ where: { 
        platform,
        display,
        region
      }})

      if (findViewport) {
        findViewport.share = result.share
        findViewport.month = month
        await repositories.viewports.save(findViewport)

        const logMessage = `Updating viewport: ${result.share}% ${display.width}x${display.height} for [${region.title}] on [${platform.title}]`

        // console.log(`Updating viewport: ${result.share}% ${display.width}x${display.height} for [${region.title}] on [${platform.title}]`)
        rollbar.info('Viewport updated', {
          share: result.share,
          displayWidth: display.width,
          displayHeight: display.height
        })
      } else {
        let viewport = new Viewport()

        viewport.platform = platform
        viewport.display = display
        viewport.region = region
        viewport.share = result.share
        viewport.month = month

        await repositories.viewports.save(viewport)

        // console.log(`Created new: ${result.share}% ${display.width}x${display.height} for [${region.title}] on [${platform.title}]`)
        rollbar.info('Viewport created', {
          share: result.share,
          displayWidth: display.width,
          displayHeight: display.height
        })
      }
    }
  })
}

const processDisplay = async (size: string, repository: Repository<Display>): Promise<Display | null> => {
  const sizeMatching = /^([0-9]+)x([0-9]+$)/
  const result = sizeMatching.exec(size)
  
  if (result) {
    const width = result[1]
    const height = result[2]

    const display = await repository.findOne({ where: { width, height }})

    if (display === undefined) {
      const tmpDisplay = new Display()
      tmpDisplay.width = parseInt(width)
      tmpDisplay.height = parseInt(height)
      await repository.save(tmpDisplay)

      return tmpDisplay
    }

    return display
  } else {
    return null
  }
}

const processCurrentMonth = async (monthNumber: number, repository: Repository<Month>): Promise<Month> => {
  const month = await repository.findOne({ number: monthNumber })
  
  if (month) {
    return month
  } else {
    let newMonth = new Month()
    newMonth.number = monthNumber
    newMonth.year = dayjs().year()

    await repository.save(newMonth)

    return newMonth
  }
}

const getRegion = async (regionCode: StatCounter.RegionCode, repository: Repository<Region>) => {
  const region = await repository.findOne({ where: { 
    code: regionCode
  }})

  if (region) return region
  else return null
}

///////////////////////////////
// THE MAIN THING
///////////////////////////////

createConnection(dbConfig as ConnectionOptions).then(async connection => {
  console.log('Running the update task')

  const repositories = {
    platforms: getManager().getRepository(Platform),
    displays: getManager().getRepository(Display),
    regions: getManager().getRepository(Region),
    viewports: getManager().getRepository(Viewport),
    months: getManager().getRepository(Month)
  }

  const allPlatforms = await repositories.platforms.find()

 // First we iterate over all the platforms
  await asyncForEach(allPlatforms, async (platform: Platform) => {

    // Then we download the data for the respective platform. It downloads data for all
    // the different continents
    const platformData = await statCounter(platform.code as StatCounter.PlatformCode)

    // Finally I iterate over the downloaded platform and update the database
    await iterateContinents(platform, platformData, repositories)
  })

  await connection.close()
}).catch(error => console.log("[server] TypeORM connection error: ", error))