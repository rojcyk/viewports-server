import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"

import Viewport from '@models/Viewport'

@Entity()
export class Display {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    name: 'width',
    type: 'integer',
  })
  width!: number

  @Column({
    name: 'height',
    type: 'integer',
  })
  height!: number

  @OneToMany(type => Viewport, viewport => viewport.platform)
  viewport?: Viewport
}

export default Display