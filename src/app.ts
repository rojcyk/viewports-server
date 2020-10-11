import Express from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'

/*****************************
 * Local imports
 *****************************/

import { handleError } from '@helpers/responseError'
import NotFound from './routes/404'
import slackRouter from './routes/api/slack'
import viewports from './routes/api/viewports'

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
app.use(bodyParser.urlencoded({ extended: true }))

/*****************************
 * ROUTES
 *****************************/

app.get('/', (req, res, next) => {
  res.send({
    message: 'Maybe sometimes.'
  })
})

app.use('/slack', slackRouter)
app.use('/api/viewports', cors(), viewports)

/*****************************
 * ERROR HANDLER
 *****************************/

app.use(handleError)
app.use(NotFound)

/*****************************
 * EXPORT
 *****************************/

export default app