import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"

import Viewport from '@models/Viewport'
// import User from '@models/user/model'
// import Role from '@models/role/model'

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

  // @OneToMany(type => Viewport, viewport => viewport.platform)
  // viewport?: Viewport

  // @ManyToOne(type => Team, team => team.members)
  // team!: Team

  // @ManyToOne(type => Role)
  // role!: Role
}

export default Display