import Express from 'express'
import { getManager } from 'typeorm'

import ResponseError from '@helpers/responseError'
import generateViewportsObject from '@helpers/generateViewportsObject'
import Month from '@models/Month'

export default async function (
  _req: Express.Request,
  res: Express.Response,
  _next: Express.NextFunction
) {
  try {

    const Months = getManager().getRepository(Month)
    const latestMonth = await Months.findOne({ order: { id: "DESC" }, })
    const viewportsObject = await generateViewportsObject(latestMonth as Month)

    res
      .status(200)
      .json({
        status: 'success',
        code: 200,
        month: latestMonth?.number,
        year: latestMonth?.year,
        data: viewportsObject
      })

  } catch (e) {
    throw new ResponseError(500, 'Something went horribly wrong.')
  }
}
