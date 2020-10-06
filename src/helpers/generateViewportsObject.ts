import { getManager } from 'typeorm'
import asyncForEach from '@helpers/asyncForEach'

import ResponseError from '@helpers/responseError'

import Viewport, { ViewportsApiResponse } from '@models/Viewport'
import Month from '@models/Month'
import Platform from '@models/Platform'
import Region from '@models/Region'

const prepareViewports = (viewports: Viewport[]) => {
  let tmpArray: ViewportsApiResponse[] = []

  viewports.forEach(viewport => {
      tmpArray.push(viewport.apiJSON({}))
  })

  return tmpArray
}

const generateViewportsObject = async (latestMonth: Month) => {
  try {
    const Viewports = getManager().getRepository(Viewport)
    const Platforms = getManager().getRepository(Platform)
    const Regions = getManager().getRepository(Region)

    const platforms = await Platforms.find({ order: { id: "ASC" }, })
    const regions = await Regions.find({ order: { id: "ASC" }, })

    let responseObject: {
      [key: string]: {
        [key: string]: ViewportsApiResponse[]
      }
    } = {}


    await asyncForEach (platforms, async (platform: Platform) => {
      let tmpPlatform: { [key: string]: ViewportsApiResponse[] } = {}

      await asyncForEach (regions, async (region: Region) => {
        const allViewports: Viewport[] = await Viewports.find({
          order: {
            share: "DESC"
          },
          where: {
            month: latestMonth,
            region: {
              id: region.id
            },
            platform: {
              id: platform.id
            }
          },
          take: 10,
          relations: ['platform','region', 'display', 'month'],
        })
        tmpPlatform[`${region.code}`] = prepareViewports(allViewports)
      })
      responseObject[`${platform.code}`] = tmpPlatform
    })

    return responseObject

  } catch (e) {
    throw new ResponseError(500, 'Something went horribly wrong.')
  }
}

export default generateViewportsObject