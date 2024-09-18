import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('videos')
export class Videos {
  @PrimaryGeneratedColumn('uuid')
  id: string
}
