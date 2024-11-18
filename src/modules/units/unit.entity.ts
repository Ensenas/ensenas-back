import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Path } from '../users/models/path.entity'

@Entity('units')
export class Unit {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ type: 'varchar', length: 200, unique: true })
  title: string

  @ManyToOne(() => Path)
  @JoinColumn({
    name: 'path',
    referencedColumnName: 'id',
  })
  path: Path

  @Column({ type: 'varchar', length: 200, unique: true })
  description: string

  @Column({ type: 'integer' })
  order: number
}
