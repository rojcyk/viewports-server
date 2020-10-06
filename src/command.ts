const SUBCOMMAND = /^(\w+) *(.*)$/

export interface OuterCommandEvent {
  text: string,
  token: string,
  team_id: string,
  team_domain: string,
  channel_id: string,
  channel_name: string,
  user_id: string,
  user_name: string,
  command: string,
  api_app_id: string,
  response_url: string,
  trigger_id: string,
}

export default class Command {
  command: string
  text: string
  token: string
  team_id: string
  team_domain: string
  channel_id: string
  channel_name: string
  user_id: string
  user_name: string
  api_app_id: string
  response_url: string
  trigger_id: string
  subcommand?: string
  callback: Function
  args: string[]

  constructor (body: OuterCommandEvent, callback: Function) {
    this.callback = callback
    this.command = body.command
    this.text = body.text
    this.token = body.token
    this.team_id = body.team_id
    this.team_domain = body.team_domain
    this.channel_id = body.channel_id
    this.channel_name = body.channel_name
    this.user_id = body.user_id
    this.user_name = body.user_name
    this.api_app_id = body.api_app_id
    this.response_url = body.response_url
    this.trigger_id = body.trigger_id

    // Check for subcommand in the command text
    const match = body.text.match(SUBCOMMAND)

    if (match) {
      const [, subcommand, args] = match
      this.subcommand = subcommand

      // Remove subcommand from the command text
      this.text = args

      // Save array of args
      this.args = args.split(' ')
    } else {
      this.text = body.text
      this.subcommand = undefined
      this.args = []
    }
  }
}