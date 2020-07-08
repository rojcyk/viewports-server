import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import Display from '@models/Display'

export default class CreateRegions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Display)
      .values([
        {
          width: 320,
          height: 480
        },
        {
          width: 320,
          height: 534
        },
        {
          width: 320,
          height: 568
        },
        {
          width: 320,
          height: 569
        },
        {
          width: 320,
          height: 570
        },
        {
          width: 320,
          height: 640
        },
        {
          width: 320,
          height: 658
        },
        {
          width: 320,
          height: 694
        },
        {
          width: 360,
          height: 640
        },
        {
          width: 360,
          height: 720
        },
        {
          width: 360,
          height: 740
        },
        {
          width: 360,
          height: 747
        },
        {
          width: 360,
          height: 748
        },
        {
          width: 360,
          height: 750
        },
        {
          width: 360,
          height: 756
        },
        {
          width: 360,
          height: 760
        },
        {
          width: 360,
          height: 771
        },
        {
          width: 360,
          height: 772
        },
        {
          width: 360,
          height: 780
        },
        {
          width: 360,
          height: 800
        },
        {
          width: 375,
          height: 667
        },
        {
          width: 375,
          height: 812
        },
        {
          width: 384,
          height: 640
        },
        {
          width: 393,
          height: 786
        },
        {
          width: 393,
          height: 851
        },
        {
          width: 412,
          height: 732
        },
        {
          width: 412,
          height: 823
        },
        {
          width: 412,
          height: 824
        },
        {
          width: 412,
          height: 846
        },
        {
          width: 412,
          height: 869
        },
        {
          width: 412,
          height: 892
        },
        {
          width: 412,
          height: 915
        },
        {
          width: 414,
          height: 736
        },
        {
          width: 414,
          height: 896
        },
        {
          width: 451,
          height: 770
        },
        {
          width: 534,
          height: 854
        },
        {
          width: 540,
          height: 960
        },
        {
          width: 545,
          height: 780
        },
        {
          width: 552,
          height: 1024
        },
        {
          width: 600,
          height: 800
        },
        {
          width: 600,
          height: 960
        },
        {
          width: 600,
          height: 976
        },
        {
          width: 600,
          height: 1024
        },
        {
          width: 601,
          height: 962
        },
        {
          width: 615,
          height: 1093
        },
        {
          width: 683,
          height: 911
        },
        {
          width: 686,
          height: 1098
        },
        {
          width: 712,
          height: 1138
        },
        {
          width: 720,
          height: 1280
        },
        {
          width: 720,
          height: 1520
        },
        {
          width: 752,
          height: 1280
        },
        {
          width: 768,
          height: 1024
        },
        {
          width: 768,
          height: 1280
        },
        {
          width: 768,
          height: 1360
        },
        {
          width: 768,
          height: 1366
        },
        {
          width: 800,
          height: 1232
        },
        {
          width: 800,
          height: 1280
        },
        {
          width: 810,
          height: 1080
        },
        {
          width: 834,
          height: 1112
        },
        {
          width: 834,
          height: 1194
        },
        {
          width: 853,
          height: 1280
        },
        {
          width: 864,
          height: 1152
        },
        {
          width: 864,
          height: 1536
        },
        {
          width: 900,
          height: 1440
        },
        {
          width: 900,
          height: 1600
        },
        {
          width: 912,
          height: 1368
        },
        {
          width: 960,
          height: 1280
        },
        {
          width: 960,
          height: 1440
        },
        {
          width: 1002,
          height: 1504
        },
        {
          width: 1024,
          height: 1280
        },
        {
          width: 1024,
          height: 1366
        },
        {
          width: 1032,
          height: 1920
        },
        {
          width: 1050,
          height: 1680
        },
        {
          width: 1080,
          height: 1920
        },
        {
          width: 1080,
          height: 2340
        },
        {
          width: 1080,
          height: 2560
        },
        {
          width: 1152,
          height: 2048
        },
        {
          width: 1200,
          height: 1920
        },
        {
          width: 1440,
          height: 2560
        },
        {
          width: 2000,
          height: 2000
        }
      ])
      .execute()
  }
}