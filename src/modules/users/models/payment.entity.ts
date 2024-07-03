import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'
import { PaymentSuscription } from '../interfaces'

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'timestamp', nullable: true })
  date: Date

  @Column({
    type: 'enum',
    enum: PaymentSuscription,
    nullable: false,
  })
  suscription: PaymentSuscription

  @ManyToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User
}
