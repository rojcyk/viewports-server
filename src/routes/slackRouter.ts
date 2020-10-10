import Express from 'express'
import bodyParser from 'body-parser'

/******************** *
 * INTERNAL IMPORTS
/******************** */

import slackAuth from './auth'
import commandRouter from './commandRouter'
import actions from './actions'
import events from './events'

/******************** *
 * SETUP
/******************** */

const router = Express.Router()

router.post('/events', events)
router.get('/auth', slackAuth)
router.use('/commands', commandRouter)
router.post('/actions', actions)

/******************** *
 * EXPORTS
/******************** */

export default router
