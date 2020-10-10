import Express, { NextFunction } from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import cors from 'cors'

/*****************************
 * Local imports
 *****************************/

import { handleError } from '@helpers/responseError'
import NotFound from './routes/404'
import slackRouter from './routes/slackRouter'
import viewports from './routes/viewports'

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

// app.use((req, res, next) => {
//   next()
// })

/*****************************
 * ROUTES
 *****************************/

app.get('/', (req, res, next) => {
  res.send({
    message: 'Maybe sometimes.'
  })
})

app.get('/add', (req, res, next) => {
  res.redirect(`${process.env.SLACK_ROOT_URL}/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}&scope=${process.env.SLACK_APP_SCOPES}&redirect_uri=${process.env.SLACK_REDIRECT_URI}`)
})

app.use('/api/slack', slackRouter)
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