import Express from 'express'

import Message from '../message'
import RequestError from '@helpers/responseError'

export default async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    if (req.command === undefined)
      throw new RequestError(500, 'No command provided')

    const msg = new Message('Popular viewports')
    msg.addSection('*Popular Viewports* around the globe')
    msg.addSection('[320x567] 22% - Android')
    msg.addSection('[320x567] 22% - Android')
    msg.addSection('[320x567] 22% - Android')
    msg.addSection('[320x567] 22% - Android')
    msg.addSection('[320x567] 22% - Android')
    msg.addSection('[320x567] 22% - Android')
    msg.addSection('[320x567] 22% - Android')
    msg.addSection('[320x567] 22% - Android')
    msg.addSection('[320x567] 22% - Android')
    msg.addSection('[320x567] 22% - Android')

    msg.addContext('Support | Donate')

    msg.post(req.command.channel_id)
  
    res.send()
  
  } catch (err) {
    next(err)
  }
}
