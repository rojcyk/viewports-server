import Express, { NextFunction } from 'express'
import bodyParser from 'body-parser'
import helmet from 'helmet'

/*****************************
 * Local imports
 *****************************/

import { handleError } from '@helpers/responseError'
import router from './router'
import NotFound from './routes/404'
import slackAuth from './routes/auth'
import commandRouter from './routes/commandRouter'

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

app.get('/api/slack/auth', slackAuth)
app.use('/api/slack/commands', commandRouter)
app.post('/api/slack/actions', (req: Express.Request, res: Express.Response, next) => {
  res.send({})
})

app.use('/api', router)

/*****************************
 * ERROR HANDLER
 *****************************/

app.use(handleError)

app.use(NotFound)

/*****************************
 * EXPORT
 *****************************/

export default app