import { MaxKey } from 'typeorm'
import Message from '../message'
import unfoldedName from '@helpers/unfoldedName'

export const makeList = (data: any[]) => {
  let viewportsList = ''

  data.forEach(({ share, display }) => {
    viewportsList += `\`${display.width}x${display.height}\` - ${share}%\n`
  })

  return viewportsList
}

export default (region: string, platform: string, data: any[], isPrivate: boolean = true) => {
  const msg = new Message('Popular Viewports')
  const name = platform.charAt(0).toUpperCase() + platform.slice(1) + ` data - ${unfoldedName(region)}`

  msg.addSection(`*${name}*`)

  msg.addSection(makeList(data))

  if (isPrivate) {
    msg.addActions([{
      type: 'button',
      text: {
        type: 'plain_text',
        emoji: true,
        text: 'Post to channel'
      },
      value: `share_${region}_${platform}`
    }])
  }

  msg.addFooter()

  return msg
}