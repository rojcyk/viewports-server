import crypto from'crypto'
import timingSafeCompare from 'tsscmp'
import Express from 'express'
import { time } from 'console'

export default (req: Express.Request) => { 
  const signature = req.headers['x-slack-signature'] as string
  const timestamp = req.headers['x-slack-request-timestamp'] as string
  const hmac = crypto.createHmac('sha256', process.env.SLACK_SIGNING_SECRET as string)

  if (signature && timestamp) {
    const [version, hash] = signature.split('=');

    // Check if the timestamp is too old
    const fiveMinutesAgo = ~~(Date.now() / 1000) - (60 * 5);
    if (parseInt(timestamp) < fiveMinutesAgo) return false

    hmac.update(`${version}:${timestamp}:${req.rawBody}`)

    // check that the request signature matches expected value
    return timingSafeCompare(hmac.digest('hex'), hash);
  } else {
    return false
  }
}