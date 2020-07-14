import {Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Month {
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
}

export default Month