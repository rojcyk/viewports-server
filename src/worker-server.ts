import 'reflect-metadata'

import app from './app'
import {createConnection, ConnectionOptions } from 'typeorm'
import dbConfigJs from '../ormconfig'

const PORT = process.env.PORT || '8000'

createConnection(dbConfigJs as ConnectionOptions).then(connection => {
  console.log(`[server] Local enviroment: ${process.env.NODE_ENV}`)
  console.log(`[server] Connected to the database: ${process.env.DB_NAME}`)

  app.listen(PORT)
  console.log(`[server] Server application is up and running on port ${PORT}`)

}).catch(error => console.log("[server] TypeORM connection error: ", error))

