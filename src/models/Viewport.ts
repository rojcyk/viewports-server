import {Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

import Platform from '@models/Platform'
import Region from '@models/Region'
import Display from '@models/Display'
import Week from '@models/Week'

export interface ViewportApiResponse {
  platform?: string
  region?: string,
  share: number
  display: {
    width: number
    height: number
  }
}

@Entity()
@Unique("UQ_VIEWPORT", ['display', 'platform', 'region'])
export class Viewport {
  @PrimaryGeneratedColumn()
  id!: number

  @Column("decimal", {
    precision: 5,
    scale: 2
  })
  share!: number

  @ManyToOne(type => Platform)
  // @JoinColumn({
  //   name: 'platform'
  // })
  platform!: Platform

  @ManyToOne(type => Region)
  // @JoinColumn({
  //   name: 'region'
  // })
  region!: Region

  @ManyToOne(type => Display)
  // @JoinColumn({
  //   name: 'display'
  // })
  display!: Display

  @ManyToOne(type => Week)
  // @JoinColumn({
  //   name: 'display'
  // })
  week!: Week

  /**
   * DB insert time.
   */
  // @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  // createdAt!: Date;

  /**
   * DB last update time.
   */
  // @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  // updatedAt!: Date;

  apiJSON = (
    { platform = false, region = false } :
    { platform?: boolean, region?: boolean }
  ): ViewportApiResponse => {

    let tmpObject: ViewportApiResponse = {
      share: this.share,
      display: {
        width: this.display.width,
        height: this.display.height
      }
    }

    if (platform) tmpObject['platform'] = this.platform.code
    if (region) tmpObject['region'] = this.region.code

    return tmpObject
  }
}

export default Viewport