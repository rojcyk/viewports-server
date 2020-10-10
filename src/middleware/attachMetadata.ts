import Express from 'express'
import { getRepository } from "typeorm"

/******************** *
 * LOCAL IMPORTS
/******************** */

import ResponseError from '@helpers/responseError'
import Team from '@models/Team'

/******************** *
 * THE MAIN THING
/******************** */

// TODO: Improve the error handling and copy sharing

export default async function (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  try {
    if (req.body.team_id === undefined && req.body.user_id)
      throw new ResponseError(401, 'Code query parameter is not available')

    const teamRepository = getRepository(Team)
    const team = await teamRepository.findOne({
      where: [
        { slackId: req.body.team_id }
      ]
    })

    if (team === undefined)
      throw new ResponseError(401, 'Team not found')

    req.team = team

    next()
  } catch (err) {
    next(err)
  }
}