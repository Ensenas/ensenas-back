import {
  Column,
  UpdateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  PrimaryColumn,
} from 'typeorm'
import { Challenge } from 'src/modules/challenges/challenge.entity'
import { ChallengeState } from 'src/modules/challenges/interfaces'

@Entity('user_progress')
export class UserProgress {
  @PrimaryGeneratedColumn('increment')
  id: number

  @PrimaryColumn()
  @ManyToOne(() => UserProgress)
  @JoinColumn({
    name: 'user_progress',
    referencedColumnName: 'id',
  })
  userProgress: UserProgress

  @ManyToOne(() => Challenge)
  @JoinColumn({
    name: 'challenge',
    referencedColumnName: 'id',
  })
  challenge: Challenge

  @Column({
    type: 'enum',
    enum: ChallengeState,
    default: ChallengeState.NOT_STARTED,
  })
  state: ChallengeState

  @Column({ type: 'timestamp', nullable: true })
  started: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_DATE' })
  updatedAt: Date
}
