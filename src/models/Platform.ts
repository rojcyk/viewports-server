import {Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}

export default Platform