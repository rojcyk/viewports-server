import Rollbar from 'rollbar'

const rollbar = new Rollbar({
  accessToken: 'b3e91c74202549aaa38870fe935b5e5d',
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: process.env.NODE_ENV
})

export default rollbar