import {Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}

export default Region