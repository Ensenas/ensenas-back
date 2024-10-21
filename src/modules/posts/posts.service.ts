import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './interfaces/posts.entity';
import { User } from '../users/models/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {}

  async createPost(user: User, content: string, title: string, videoUrl?: string): Promise<Post> {
    // Busca al usuario por su ID, para asegurarse de que es una instancia correcta de la entidad User
    const userEntity = await this.postRepository.manager.findOne(User, { where: { id: user.id } });
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    const newPost = this.postRepository.create({ 
        user: userEntity, 
        content, 
        title, 
        videoUrl,
        created_at: new Date(),
    });
    console.log(newPost);
    return this.postRepository.save(newPost);
  }

  async getAllPosts(): Promise<Post[]> {
    return this.postRepository.find({ relations: ['user'] });
  }

  async getPostsByUser(userId: string): Promise<Post[]> {
    return this.postRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }
}
