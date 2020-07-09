import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import Region from '@models/Region'

export default class CreateRegions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Region)
      .values([
        {
          title: 'Worldwide',
          code: 'ww',
          url: 'Worldwide',
        }, {
          title: 'Africa',
          code: 'af',
          url: 'Africa',
        }, {
          title: 'Asia',
          code: 'as',
          url: 'Asia',
        }, {
          title: 'Europe',
          code: 'eu',
          url: 'Europe',
        }, {
          title: 'Oceania',
          code: 'oc',
          url: 'Oceania',
        }, {
          title: 'North America',
          code: 'na',
          url: 'North%20America',
        }, {
          title: 'South America',
          code: 'sa',
          url: 'South%20America',
        }
      ])
      .execute()
  }
}