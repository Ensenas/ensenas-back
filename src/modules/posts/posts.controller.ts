import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { PostsService } from './posts.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Roles } from '../auth/decorators/roles.decorator'
import { Role } from '../users/interfaces'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CreatePostDto } from './dto/createPost.dto'
import { Public } from '../auth/decorators/public.decorator'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/posts')
  @Public()
  async getAllPosts() {
    return this.postsService.getAllPosts()
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @Post('/create-post')
  @UseInterceptors(FileInterceptor('video')) // Interceptor para manejar el archivo
  async createPost(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File, // El archivo de video subido
    @Request() req,
  ) {
    const { title, content } = createPostDto
    const { user } = req

    // Llamamos al servicio para que suba el video a S3 y cree el post
    return this.postsService.createPost(user, content, title, file)
  }

  // Nuevo endpoint para la búsqueda de posts
  @Get('/search')
  @Public()
  async searchPosts(@Query('query') query: string) {
    return this.postsService.searchPosts(query)
  }
}
