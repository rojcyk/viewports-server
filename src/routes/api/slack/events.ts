import Express from 'express'

import ResponseError from '@helpers/responseError'
import verifySlackSignature from '@helpers/verifySlackSignature'


const urlVerfication = (req: Express.Request, res: Express.Response) => {
  // verify Events API endpoint by returning challenge if present
  res.send({ challenge: req.body.challenge })
}

const eventCallback = (req: Express.Request, res: Express.Response) => {
  if (verifySlackSignature(req) === false)
    throw new ResponseError(404, 'Nothing to verify')

  const { type, user, channel, tab } = req.body.event

  switch (type) {
    case 'app_home_opened':
      break
    default:
      break
  }
}

export default async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {    
    switch (req.body.type) {
      case 'url_verification':
        urlVerfication(req, res)
        break

      case 'event_callback': 
        eventCallback(req, res)
        break
    }
  
    res.send()
  } catch (err) {
    next(err)
  }
}