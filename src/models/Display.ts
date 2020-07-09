import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"

// import Viewport from '@models/viewport'

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

  // @OneToMany(type => Viewport, viewport => viewport.display)
  // viewports?: Viewport[]
}

export default Display