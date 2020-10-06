import Express from 'express'
import Command, { OuterCommandEvent } from './command'

/**
 * Parses subcommands and routes the request based on the subcommand
 */
export default function route (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  let callback
  let command

  callback = (message: string) => {
    res.status(200).json(message)

    // Any further responses should use the delayed response callback
    // command.delay()
  }

  command = new Command(req.body as OuterCommandEvent, callback)

  if (command.subcommand) {
    const [url] = req.url.split('?')
    req.url = url + command.subcommand
  }

  req.command = command

  next()
}