import Express from 'express'
import cors from 'cors'
import viewports from './routes/viewports'

/*****************************
 * ROUTER SETUP
 *****************************/

const router = Express.Router()

/*****************************
 * VIEWPORTS ROUTES
 *****************************/

router.get('/viewports', cors(), viewports)

/*****************************
 * EXPORTS
 *****************************/

export default router