import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user.entity'
import { Challenge } from 'src/modules/challenges/challenge.entity'

@Entity('user_challenge_progress')
export class UserChallengeProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user',
    referencedColumnName: 'id',
  })
  user: User

  @ManyToOne(() => Challenge)
  @JoinColumn({
    name: 'challenge',
    referencedColumnName: 'id',
  })
  challenge: Challenge

  @Column({ type: 'bool' })
  completed: boolean

  @Column({ type: 'bool' })
  started: boolean

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_DATE' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_DATE' })
  updatedAt: Date
}
