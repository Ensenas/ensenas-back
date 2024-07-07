/**
 * TODO: IN PROGRESS
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('challenges')
export class Country {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 200, unique: true })
  title: string

  @Column({ type: 'varchar', length: 200, unique: true })
  description: string
}
