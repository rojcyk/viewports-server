import { Response } from 'express'

export const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode, message, body } = err

  res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message,
    ...body
  })
}

export default class ErrorHandler extends Error {
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

export const handleSuccess = (statusCode: number, data: any, res: Response) => {
  res
    .status(statusCode)
    .json({
      status: 'success',
      code: statusCode,
      data: data
    })
}