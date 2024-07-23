import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from './user.entity'
import { Path } from './path.entity'

@Entity('user_progress')
export class UserProgress {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @OneToOne(() => User, (user) => user.userProgress)
  user: User

  @ManyToOne(() => Path)
  @JoinColumn({
    name: 'path',
    referencedColumnName: 'id',
  })
  path: Path

  @Column({ type: 'integer' })
  points: number

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_DATE' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_DATE' })
  updatedAt: Date
}
