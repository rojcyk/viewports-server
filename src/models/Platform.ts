import {Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"

import Viewport from '@models/Viewport'
// import User from '@models/user/model'
// import Role from '@models/role/model'

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

  @OneToMany(type => Viewport, viewport => viewport.platform)
  viewport!: Viewport

  // @ManyToOne(type => Team, team => team.members)
  // team!: Team

  // @ManyToOne(type => Role)
  // role!: Role
}

export default Platform