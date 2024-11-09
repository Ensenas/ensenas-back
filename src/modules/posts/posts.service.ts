import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Post } from './interfaces/posts.entity';
import { User } from '../users/models/user.entity';
import * as AWS from 'aws-sdk';

@Injectable()
export class PostsService {
  private s3: AWS.S3;

  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) {
    // Configura el cliente de S3
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async createPost(user: User, content: string, title: string, file: Express.Multer.File): Promise<Post> {
    // Busca al usuario por su ID
    const userEntity = await this.postRepository.manager.findOne(User, { where: { mail: user.mail } });
    if (!userEntity) {
      throw new NotFoundException('User not found');
    }

    // Si hay un archivo, súbelo a S3
    let videoUrl = '';
    if (file) {
      const uploadParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `videos/${Date.now()}_${file.originalname}`,  // Generamos un nombre único
        Body: file.buffer,
        ACL: 'public-read',  // Hacemos que el video sea accesible públicamente
        ContentType: file.mimetype,
      };

      try {
        const data = await this.s3.upload(uploadParams).promise();
        videoUrl = data.Location;  // Este es el enlace público de S3
      } catch (err) {
        console.error('Error subiendo a S3:', err);
        throw new Error('Error uploading video to S3');
      }
    }

    // Crear el post con el enlace del video
    const newPost = this.postRepository.create({ 
      user: userEntity, 
      content, 
      title, 
      videoUrl,  // Guarda el URL del video subido
      created_at: new Date(),
    });
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

  async searchPosts(query: string): Promise<Post[]> {
    return this.postRepository.find({
      where: [
        { title: ILike(`%${query}%`) },
        { content: ILike(`%${query}%`) }
      ],
      relations: ['user']
    });
  }
}
