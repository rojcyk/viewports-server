import Express from 'express'
import ErrorHandler, { handleSuccess, } from '@helpers/responseHandler'
import { getManager } from 'typeorm'
import Viewport, { ViewportApiResponse } from '@models/Viewport'
import Month from '@models/Month'
import Platform from '@models/Platform'
import Region from '@models/Region'
import asyncForEach from '@helpers/asyncForEach'

const prepareViewports = (viewports: Viewport[]) => {
  let tmpArray: ViewportApiResponse[] = []

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
        [key: string]: ViewportApiResponse[]
      }
    } = {}


    await asyncForEach (platforms, async (platform: Platform) => {
      let tmpPlatform: { [key: string]: ViewportApiResponse[] } = {}

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

    handleSuccess(200, responseObject, res)

  } catch (e) {
    console.log(e)
    throw new ErrorHandler(500, 'Something went horribly wrong.')
  }
}
