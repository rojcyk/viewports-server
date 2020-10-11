import Express from 'express'
import { getRepository } from "typeorm"
import fetch from 'node-fetch'

/******************** *
 * LOCAL IMPORTS
/******************** */

import ResponseError from '@helpers/responseError'
import Team from '@models/Team'

// https://slack.com/oauth/v2/authorize?scope=commands&client_id=16283955284.1434524164448

/******************** *
 * Helper requests
/******************** */

export const slackAccessTokenRquest = async (code: string) => {
  const getAccessToken = await fetch(`${process.env.SLACK_ROOT_URL}/api/oauth.v2.access?client_id=${process.env.SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}&code=${code}&redirect_uri=${process.env.SLACK_REDIRECT_URI}`)

  if (getAccessToken.ok) {
    return await getAccessToken.json()
  } else {
    return null
  }
}

export const slackTeamInfoRequest = async (token: string) => {
  const getUserIdentity = await fetch(`${process.env.SLACK_ROOT_URL}/api/team.info?token=${token}`)

  if (getUserIdentity.ok) {
    return await getUserIdentity.json()
  } else {
    return null
  }
}

/******************** *
 * THE MAIN THING
/******************** */

export default async function (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    // First we need to check whether the URL contains CODE from slack
    const err = req.query.error
    if (err === 'access_denied')
      throw new ResponseError(401, 'User has declined the permission prompt')

    const code = req.query.code
    if (code === undefined)
      throw new ResponseError(401, 'Code query parameter is not available')

    // Then we need to make a request to get an accessToken
    const accessTokenResponse = await slackAccessTokenRquest(code as string)
    if (accessTokenResponse.error)
      throw new ResponseError(401, accessTokenResponse.error)
    
    const teamInfoResponse = await slackTeamInfoRequest(accessTokenResponse.access_token)
    if (teamInfoResponse.error)
      throw new ResponseError(401, teamInfoResponse.error)

    const teamRepository = getRepository(Team)
    let tmpTeam = await teamRepository.findOne({
      where: [
        { slackId: accessTokenResponse.team.id }
      ]
    })

    if (tmpTeam) {
      tmpTeam.name = accessTokenResponse.team.name
      tmpTeam.slackId = accessTokenResponse.team.id
      tmpTeam.domain = teamInfoResponse.team.domain
      tmpTeam.emailDomain = teamInfoResponse.team.email_domain === '' ? null : teamInfoResponse.team.email_domain

      if (accessTokenResponse.access_token) {
        tmpTeam.botUserToken = accessTokenResponse.access_token
        tmpTeam.botUserId = accessTokenResponse.bot_user_id
      }
    } else {
      tmpTeam = new Team()

      tmpTeam.name = accessTokenResponse.team.name
      tmpTeam.slackId = accessTokenResponse.team.id
      tmpTeam.domain = teamInfoResponse.team.domain
      tmpTeam.emailDomain = teamInfoResponse.team.email_domain === '' ? null : teamInfoResponse.team.email_domain

      if (accessTokenResponse.access_token) {
        tmpTeam.botUserToken = accessTokenResponse.access_token
        tmpTeam.botUserId = accessTokenResponse.bot_user_id
      }
    }

    await teamRepository.save(tmpTeam)

    res.redirect(`https://${teamInfoResponse.team.domain}.slack.com`)
  } catch (err) {
    next(err)
  }
}