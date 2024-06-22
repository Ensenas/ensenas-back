import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Role } from './interfaces/user'

@Entity()
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

  @Column({ type: 'bool' })
  set_password: boolean

  @Column({
    type: 'enum',
    enum: Role,
    nullable: true,
  })
  role: Role
}
