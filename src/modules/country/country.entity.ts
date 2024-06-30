import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Country {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 200, unique: true })
  mail: string
}
