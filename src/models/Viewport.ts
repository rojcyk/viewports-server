import {Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from "typeorm"

import Platform from '@models/Platform'
import Region from '@models/Region'
import Display from '@models/Display'

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

  @ManyToOne(type => Platform, platform => platform.viewport)
  @JoinColumn({
    name: 'platform'
  })
  platform!: Platform

  @ManyToOne(type => Region, region => region.viewport)
  @JoinColumn({
    name: 'region'
  })
  region!: Region

  @ManyToOne(type => Display, display => display.viewport)
  @JoinColumn({
    name: 'display'
  })
  display!: Display
}

export default Viewport