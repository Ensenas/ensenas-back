import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 200, unique: true })
  title: string

  @Column({ type: 'varchar', length: 200, unique: true })
  description: string

  @Column({ type: 'integer' })
  order: number
}
