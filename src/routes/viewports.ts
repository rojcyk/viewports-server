import Express from 'express'
import ErrorHandler, { handleSuccess, } from '@helpers/responseHandler'

export default async function (
  _req: Express.Request,
  res: Express.Response,
  _next: Express.NextFunction
) {
  try {
    handleSuccess(200, {
      something: 'yeah'
    }, res)

  } catch (e) {
    throw new ErrorHandler(500, 'Something went horribly wrong.')
  }
}
