import Express from 'express'

import ResponseError from '@helpers/responseError'
import generateViewportsObject from '@helpers/generateViewportsObject'
import viewportsList from '@helpers/listViewports'

export default async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
  try {
    if (req.body.payload === undefined)
      throw new ResponseError(401, 'Missing payload')
    
    const payload = JSON.parse(req.body.payload)

    switch (payload.type) {
      case 'block_actions':
        const reg = /([a-z]+)_([a-z]+)_([a-z]+)/
        const result = reg.exec(payload.actions[0].value)
        
        if (result) {
          const [_original, action, region, platform] = result
          const allViewports = await generateViewportsObject()
          const viewports = allViewports[platform][region]

          switch (action) {
            case 'list':
              const shouldBeSharable = payload.channel.name === 'directmessage' ? false : true
              const msg = viewportsList(region, platform, viewports, shouldBeSharable)
              msg.respond(payload.response_url)
              break
            case 'share':
              const msgPublic = viewportsList(region, platform, viewports, false)
              msgPublic.respond(payload.response_url, false)
              break
          }
        } 
        break
    }
  
    res.send()
  } catch (err) {
    next(err)
  }
}