import Express from 'express'

/******************** *
 * INTERNAL IMPORTS
/******************** */

import auth from './auth'
import commands from './commands'
import actions from './actions'
import events from './events'

/******************** *
 * SETUP
/******************** */

const router = Express.Router()

router.get('/auth', auth)
router.post('/events', events)
router.use('/commands', commands)
router.post('/actions', actions)

router.get('/add', (req, res, next) => {
  res.redirect(`${process.env.SLACK_ROOT_URL}/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}&scope=${process.env.SLACK_APP_SCOPES}&redirect_uri=${process.env.SLACK_REDIRECT_URI}`)
})

/******************** *
 * EXPORTS
/******************** */

export default router
