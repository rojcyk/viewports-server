import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"

// import Viewport from '@models/viewport'

@Entity()
export class Week {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    name: 'number',
    type: 'integer',
  })
  number!: number

  @Column({
    name: 'year',
    type: 'integer',
  })
  year!: number

  // @OneToMany(type => Viewport, viewport => viewport.display)
  // viewports?: Viewport[]
}

export default Week