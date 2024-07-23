import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 200, unique: true })
  title: string

  @Column({ type: 'varchar', length: 200, unique: true })
  description: string

  @Column({ type: 'integer' })
  order: number
}
