import {Entity, PrimaryGeneratedColumn, Column } from "typeorm"

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
}

export default Display