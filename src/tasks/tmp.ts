import 'reflect-metadata'
import {createConnection, ConnectionOptions, Repository} from "typeorm"

import dbConfig from '../../ormconfig'

import asyncForEach from '@helpers/asyncForEach'
import { getManager } from 'typeorm'
import statCounter from '@helpers/statCounter'
import tempData from './tempData'

import Display from '@models/Display'
import Platform from '@models/Platform'
import Region from '@models/Region'
import Viewport from '@models/Viewport'

type Repositories = {
  Displays: Repository<Display>,
  Viewports: Repository<Viewport>,
  Regions: Repository<Region>
}

const iterateContinents = async (platform: Platform, platformData: StatCounter.PlatformData) => {
  const continents = Object.entries(platformData)

  const Displays = getManager().getRepository(Display)
  const Regions = getManager().getRepository(Region)
  const Viewports = getManager().getRepository(Viewport)

  await asyncForEach(continents, async (continent: [StatCounter.RegionCode, StatCounter.Result[]]) => {
    const continentCode = continent[0]
    const continentResults = continent[1]

    await iterateResults(platform, platformData, continentCode, continentResults, {
      Displays,
      Viewports,
      Regions
    })
  })
}


const iterateResults = async (platform: Platform, platformData: StatCounter.PlatformData, regionName: StatCounter.RegionCode, data: StatCounter.Result[], repositories: Repositories) => {
  await asyncForEach(data, async (result: StatCounter.Result) => {
    const display = await processDisplay(result.resolution, repositories.Displays)
    const region = await processRegion(regionName, repositories.Regions)

    if (display && region) {
      const findViewport = await repositories.Viewports.findOne({ where: { 
        platform,
        display,
        region
      }})

      if (findViewport) {
        findViewport.share = result.share
        await repositories.Viewports.save(findViewport)

        console.log(`Updating viewport: ${display.width}x${display.height} for [${region.title}] on [${platform.title}]`)
      } else {
        let viewport = new Viewport()

        viewport.platform = platform
        viewport.display = display
        viewport.region = region
        viewport.share = result.share

        await repositories.Viewports.save(viewport)

        console.log(`Created new: ${display.width}x${display.height} for [${region.title}] on [${platform.title}]`)
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

const processRegion = async (regionCode: StatCounter.RegionCode, repository: Repository<Region>) => {
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
  let platformRepository = connection.getRepository(Platform)
  let allPlatforms = await platformRepository.find()

  await asyncForEach(allPlatforms, async (platform: Platform) => {
    const platformData = await statCounter(platform.code as StatCounter.PlatformCode)
    await iterateContinents(platform, platformData)
  })

  await connection.close()
}).catch(error => console.log("[server] TypeORM connection error: ", error))