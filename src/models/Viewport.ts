import {Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne, JoinColumn } from "typeorm"

import Platform from '@models/Platform'
import Region from '@models/Region'

@Entity()
@Unique("UQ_VIEWPORT", ['size', 'platform', 'region'])
export class Viewport {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    name: 'size',
    type: 'varchar',
    length: 230,
    unique: true,
  })
  size!: string

  @Column("decimal", {
    precision: 5,
    scale: 2
  })
  share!: number

  // @Column({ name: 'hovno' })
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
}

export default Viewport