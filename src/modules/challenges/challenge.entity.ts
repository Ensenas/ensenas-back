import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Lesson } from '../lessons/lesson.entity'

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 200, unique: true })
  title: string

  @Column({ type: 'varchar', length: 200, unique: true })
  description: string

  @ManyToOne(() => Lesson)
  @JoinColumn({
    name: 'lesson',
    referencedColumnName: 'id',
  })
  lesson: Lesson

  /// VIDEO WILL BE JUST A S3 LINK
  @Column({ type: 'varchar', length: 200 })
  video: string
}
