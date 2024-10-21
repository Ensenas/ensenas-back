import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from '../../users/models/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user_questions')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'Unique identifier for the post' })
  id: string;

  @Column({ type: 'varchar', length: 1000 })
  @ApiProperty({ description: 'Content of the post',  default: 'No content', maxLength: 1000 })
  content: string;

  @Column({ type: 'varchar', length: 100 })
  @ApiProperty({ description: 'Title of the post', default: 'Untitled Post',  maxLength: 100 })
  title: string;

  @Column({ type: 'varchar', length: 500})
  @ApiProperty({ description: 'URL of the video associated with the post', maxLength: 500, required: false })
  videoUrl: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user',
    referencedColumnName: 'id',})
  @ApiProperty({ description: 'User who created the post' })
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'now()' })
  @ApiProperty({ description: 'Date when the post was created' })
  created_at: Date;
}
