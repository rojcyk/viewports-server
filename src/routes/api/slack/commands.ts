import Express from 'express'

/******************** *
 * INTERNAL IMPORTS
/******************** */

import attachCommand from '@middleware/attachCommand'
import attachMetadata from '@middleware/attachMetadata'
import listSelect from '../../listSelect'

/******************** *
 * SETUP
/******************** */

const router = Express.Router()

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

router.post('*', listSelect)

/******************** *
 * EXPORTS
/******************** */

export default router
