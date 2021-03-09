import 'reflect-metadata'

import app from './app'
import {createConnection, ConnectionOptions } from 'typeorm'
import dbConfig from '../ormconfig'

const PORT = process.env.PORT || '8000'

createConnection(dbConfig as ConnectionOptions).then(connection => {
  console.log(`[server] Local enviroment: ${process.env.NODE_ENV}`)
  console.log(`[server] Server application is up and running on port ${PORT}`)

  app.listen(PORT)

}).catch(error => console.log("[server] TypeORM connection error: ", error))

