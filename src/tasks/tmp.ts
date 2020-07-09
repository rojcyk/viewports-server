import 'reflect-metadata'
import {createConnection, ConnectionOptions} from "typeorm"

import dbConfig from '../../ormconfig'
import Platform from '@models/Platform'
import asyncForEach from '@helpers/asyncForEach'
import statCounter from '@helpers/statCounter'

///////////////////////////////
// THE MAIN THING
///////////////////////////////

createConnection(dbConfig as ConnectionOptions).then(async connection => {
  let platformRepository = connection.getRepository(Platform)
  let allPlatforms = await platformRepository.find()

  await asyncForEach(allPlatforms, async (platform: Platform) => {
    const platformData = await statCounter(platform.code as StatCounter.PlatformCode)

  })
}).catch(error => console.log("[server] TypeORM connection error: ", error))