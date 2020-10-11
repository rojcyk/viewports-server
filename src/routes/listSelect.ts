import Express from 'express'

import Message from '../message'
import RequestError from '@helpers/responseError'
import unfoldedName from '@helpers/unfoldedName'

export default async (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  try {
    if (req.command === undefined)
      throw new RequestError(500, 'No command provided')

    const region = req.command.subcommand || 'ww'

    const msg = new Message('Popular Viewports')
    msg.addSection(`Popular screen sizes \`${unfoldedName(region)}\``)

    msg.addActions([{
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: 'Mobile'
      },
      value: `list_${region}_mobile`
    }, {
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: 'Desktop'
      },
      value: `list_${region}_desktop`
    }, {
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: 'Tablet'
      },
      value: `list_${region}_tablet`
    }])

    msg.addFooter()
    msg.respond(req.command.response_url)
  
    res.send()
  
  } catch (err) {
    next(err)
  }
}
