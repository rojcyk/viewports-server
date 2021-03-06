import { ContextBlock, DividerBlock, SectionBlock, ActionsBlock } from '@slack/web-api'
import { SlackWebAPI } from './slack'
import fetch from 'node-fetch'

type Blocks = (DividerBlock | SectionBlock | ContextBlock | ActionsBlock)[]

interface ActionButton {
  type: 'button',
  text: {
    type: 'plain_text',
    emoji: boolean,
    text: string
  },
  value: string
}

export default class Message {
  text: string
  blocks: Blocks

  constructor (text: string) {
    this.text = text
    this.blocks = []
    // this.replace_original = false
  }

  async post (channel: string) {
    const message = {
      text: this.text,
      channel: channel,
      blocks: this.blocks
    }

    return SlackWebAPI.chat.postMessage(message)
      .then(res => { return res })
      .catch(err => { throw new Error(err) })
  }

  async postHidden (channel: string, user: string) {
    const message = {
      text: this.text,
      channel: channel,
      user: user,
      blocks: this.blocks
    }

    return SlackWebAPI.chat.postEphemeral(message)
      .then(res => { return res })
      .catch(err => { throw new Error(err) })
  }

  async respond (respondUrl: string, ephemeral: boolean = true) {
    const message = {
      text: this.text,
      blocks: this.blocks,
      delete_original: ephemeral ? false : true,
      response_type: ephemeral ? 'ephemeral' : 'in_channel'
    }

    const getUserIdentity = await fetch(
      respondUrl,
      {
        method: 'POST',
        body: JSON.stringify(message)

    })

    // console.log()
  
    // if (getUserIdentity.ok) {
    //   return await getUserIdentity.json()
    // } else {
    //   return null
    // }
  }

  async postUpdate (channel: string, timestamp: string) {
    const message = {
      text: this.text,
      channel: channel,
      blocks: this.blocks,
      ts: timestamp
    }

    console.log(message)

    return SlackWebAPI.chat.update(message)
      .then(res => { return res })
      .catch(err => {
        console.log(err)
        throw new Error(err)
      })
  }

  addContext (text: string) {
    this.blocks.push({
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: text
        }
      ]
    })

    return this
  }

  addSection (text: string) {
    this.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: text
      }
    })

    return this
  }

  addActions (elements: ActionButton[]) {
    this.blocks.push({
      type: 'actions',
      elements
    })
  }

  addDivider () {
    this.blocks.push({
      type: 'divider'
    })

    return this
  }
  addFooter ( ) {
    this.addContext('<https://github.com/rojcyk/figma-sweeper/issues|Support> | <https://github.com/sponsors/rojcyk|Donate>')
  }

//   respond (responseUrl, replace = false) {
//     this.replace_original = replace

//     // console.log(JSON.stringify(this))

//     return fetch(responseUrl, {
//       method: 'post',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         replace_original: true,
//         blocks: this.blocks
//         // text: 'hovno'
//       }) // JSON.stringify(this)
//     }).catch(e => console.log(e))
//   }
// }

// const constructBodyString = (climb, index, link, verbose) => {
//   let text = `*${climb.title}*` + ` \`${climb.status}/${climb.peak}\``

//   if (index) text = `${index}. ` + text
//   if (verbose) {
//     if (climb.comment) text = `${text}\n` + `_${climb.comment}_`
//   }

//   if (link) {
//     if (climb.link) text = `${text}\n` + `<${climb.link}|More>`
//   }

//   return text
// }

// const constructFooterString = (climb, channel, workspace) => {
//   let footerText = ``

//   if (climb.deadline) footerText = footerText.concat(`Deadline: *${climb.deadline}*\n`)
//   if (climb.asignee) footerText = footerText.concat(`Asignee: *<https://${workspace.domain}.slack.com/messages/${climb.asignee}|${climb.asigneeName}>*\n`)
//   footerText = footerText.concat(`Channel: <https://${workspace.domain}.slack.com/messages/${channel.slackId}|${channel.name}>\n`)
//   if (climb.status) footerText = footerText.concat(`Status: *${percentageForValue(climb.status, climb.peak)}%*`)

//   return footerText
// }

// export const constructClimb = (climb, channel, workspace, index = false, accessory = false, link = false, verbose = false) => {
//   let body = {
//     type: 'section',
//     text: {
//       type: 'mrkdwn',
//       text: constructBodyString(climb, index, link, verbose)
//     }
//   }

//   if (accessory) body.accessory = accessory

//   let footer = {
//     type: 'context',
//     elements: [{
//       type: 'mrkdwn',
//       text: constructFooterString(climb, channel, workspace)
//     }]
//   }

//   return {
//     body,
//     footer
//   }
}