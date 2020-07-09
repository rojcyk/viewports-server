import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

// import Viewport from '@models/viewport'

@Entity()
export class Region {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: 'varchar',
    length: 230,
  })
  title!: string

  @Column({
    type: 'varchar',
    length: 230,
    unique: true
  })
  code!: string

  @Column({
    type: 'varchar',
    length: 230
  })
  url!: string

  // @OneToMany(type => Viewport, viewport => viewport.region)
  // viewports?: Viewport[]
}

export default Region