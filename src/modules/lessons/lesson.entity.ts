import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 200, unique: true })
  title: string

  @Column({ type: 'varchar', length: 200, unique: true })
  description: string

  @Column({ type: 'varchar', length: 1000, unique: true, nullable:true })
  detailedDescription: string

  @Column({ type: 'integer' })
  order: number

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_DATE' })
  updatedAt: Date
}
