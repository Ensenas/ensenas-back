import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Lesson } from '../lessons/lesson.entity'

@Entity('challenges')
export class Challenge {
  @PrimaryGeneratedColumn('increment')
  id: number

  @ManyToOne(() => Lesson)
  @JoinColumn({
    name: 'lesson',
    referencedColumnName: 'id',
  })
  lesson: Lesson

  @Column({ type: 'integer' })
  points: number

  /// VIDEO WILL BE JUST A S3 LINK
  @Column({ type: 'varchar', length: 200 })
  video: string
}
