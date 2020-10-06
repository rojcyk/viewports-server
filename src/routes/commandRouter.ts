import Express from 'express'

/******************** *
 * INTERNAL IMPORTS
/******************** */

import attachCommand from '../attachCommand'
import attachMetadata from '../attachMetadata'

import emptyCommand from './empty'

/******************** *
 * SETUP
/******************** */

const router = Express.Router()

router.use('/', (req, res, next) => {
    console.log('-----------------------')
    next()
})

/* Attach metadata will attach data from database to the request.
 * like user metadata, or team metadata
 */
router.use('/', attachMetadata)

/* RouteCommand takes the url, removes unnecessary stuff and overwrites
 * the original url, I then use regex to route it. It overrides the URL
 * so it should be the last middleware used. Inspired from GitHub slack
 * integration
 */
router.use('/', attachCommand)

/******************** *
 * Commands
/******************** */

router.post('', emptyCommand)

/******************** *
 * EXPORTS
/******************** */

export default router
