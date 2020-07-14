import Express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

/*****************************
 * Local imports
 *****************************/

import ErrorHandler, { handleError } from '@helpers/responseHandler'
import router from './router'
import NotFound from './routes/404'

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

app.get('/', (req, res, next) => {
  res.send({
    message: 'Maybe sometimes.'
  })
})

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

app.use(NotFound)

/*****************************
 * EXPORT
 *****************************/

export default app