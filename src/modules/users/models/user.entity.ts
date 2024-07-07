import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Role } from '../interfaces/user'
import { Country } from '../../country/country.entity'
import { Payment } from './payment.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 200, unique: true })
  mail: string

  @Column({ type: 'varchar', length: 200, unique: false })
  name: string

  @Column({ type: 'varchar', length: 200, unique: false })
  surname: string

  @Column({ type: 'varchar', length: 200, unique: true })
  password: string

  @Column({ type: 'timestamp', nullable: true })
  birth_date: Date

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_DATE' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_DATE' })
  updatedAt: Date

  @Column({ default: false })
  active: boolean

  @ManyToOne(() => Country)
  @JoinColumn({
    name: 'country',
    referencedColumnName: 'id',
  })
  country: Country

  @Column({
    type: 'enum',
    enum: Role,
    nullable: true,
  })
  roles: Role[]

  @OneToMany(() => Payment, (payment) => payment.user)
  payments: Payment[]
}
