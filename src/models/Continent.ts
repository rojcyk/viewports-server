import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne } from "typeorm"

// import Team from '@models/team/model'
// import User from '@models/user/model'
// import Role from '@models/role/model'

@Entity()
export class Continent {
  @PrimaryGeneratedColumn()
  id!: number

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
  name!: string



  // @ManyToOne(type => User, user => user.members)
  // user!: User

  // @ManyToOne(type => Team, team => team.members)
  // team!: Team

  // @ManyToOne(type => Role)
  // role!: Role
}

export default Continent