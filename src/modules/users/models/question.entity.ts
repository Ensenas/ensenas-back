import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity('user_questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user',
    referencedColumnName: 'id',
  })
  user: User

  @Column({ type: 'varchar', length: 200 })
  content: string
}
