import Express from 'express'
import { getManager } from 'typeorm'

import ErrorHandler from '@helpers/responseHandler'
import asyncForEach from '@helpers/asyncForEach'

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

export default async function (
  _req: Express.Request,
  res: Express.Response,
  _next: Express.NextFunction
) {
  try {

    const Viewports = getManager().getRepository(Viewport)
    const Months = getManager().getRepository(Month)
    const Platforms = getManager().getRepository(Platform)
    const Regions = getManager().getRepository(Region)

    const latestMonth = await Months.findOne({ order: { id: "DESC" }, })
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

    res
      .status(200)
      .json({
        status: 'success',
        code: 200,
        month: latestMonth?.number,
        year: latestMonth?.year,
        data: responseObject
      })

  } catch (e) {
    console.log(e)
    throw new ErrorHandler(500, 'Something went horribly wrong.')
  }
}
