import Express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

/*****************************
 * Local imports
 *****************************/

import ErrorHandler, { handleError } from '@helpers/responseHandler'
import router from './router'

/*****************************
 * EXPRESS
 *****************************/

const app: Express.Application = Express()

/*****************************
 * VENDOR MIDDLEWARE
 *****************************/

// Enabling cross origin support
// app.use(cors())

// Basic express protection middleware
app.use(helmet())

// Parses json only
app.use(bodyParser.json())

/*****************************
 * ROUTES
 *****************************/

app.use('/api', router)

/*****************************
 * ERROR HANDLER
 *****************************/

app.use((
  err: ErrorHandler,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction) => {
    handleError(err, res)
})

/*****************************
 * EXPORT
 *****************************/

export default app