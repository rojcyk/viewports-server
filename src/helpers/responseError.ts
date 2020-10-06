import Express, { Response } from 'express'

export const handleError = (
  err: ResponseError | Error,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  if (err instanceof ResponseError) {
    const { statusCode, message, body } = err

    res.status(statusCode).json({
      status: 'error',
      code: statusCode,
      message,
      ...body
    })
  } else {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Unexpected error, sorry.'
    })
  }
}

export default class ResponseError extends Error {
  statusCode: number
  message: string
  body: any

  constructor(statusCode: number, message: string = 'Unknown error', body?: any) {
    super();
    this.statusCode = statusCode
    this.message = message
    this.body = body
  }
}
