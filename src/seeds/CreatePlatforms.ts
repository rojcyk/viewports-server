import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import Platform from '@models/Platform'

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Platform)
      .values([
        { code: 'mobile', title: 'Mobile' },
        { code: 'tablet', title: 'tablet' },
        { code: 'desktop', title: 'desktop' },
      ])
      .execute()
  }
}