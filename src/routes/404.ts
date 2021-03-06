import Express from 'express'

export const NotFound = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  res.status(404)

  // respond with json
  if (req.accepts('json')) {
    res.status(404).send({ error: 'Not found' })
    return
  }

  // default to plain-text. send()
  res.status(404).type('txt').send('Not found')
}

export default NotFound