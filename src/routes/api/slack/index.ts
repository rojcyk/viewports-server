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

/******************** *
 * EXPORTS
/******************** */

export default router
