import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"

// import Viewport from '@models/viewport'

@Entity()
export class Platform {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    type: 'varchar',
    length: 230,
    unique: true,
  })
  code!: string

  @Column({
    type: 'varchar',
    length: 230
  })
  title!: string

  // @OneToMany(type => Viewport, viewport => viewport.platform)
  // viewports?: Viewport[]
}

export default Platform