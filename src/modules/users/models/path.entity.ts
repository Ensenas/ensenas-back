import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('path')
export class Path {
  @PrimaryGeneratedColumn('increment')
  id: string

  @Column({ type: 'varchar', length: 200 })
  title: string

  @Column({ type: 'varchar', length: 200 })
  description: string
}
