import {Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"

import Viewport from '@models/Viewport'
// import User from '@models/user/model'
// import Role from '@models/role/model'

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

  @OneToMany(type => Viewport, viewport => viewport.platform)
  viewport!: Viewport


  // @ManyToOne(type => User, user => user.members)
  // user!: User

  // @ManyToOne(type => Team, team => team.members)
  // team!: Team

  // @ManyToOne(type => Role)
  // role!: Role
}

export default Region