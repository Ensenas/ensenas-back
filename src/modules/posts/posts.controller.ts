import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../users/interfaces';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePostDto } from './dto/createPost.dto';
import { Public } from '../auth/decorators/public.decorator'

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/posts')
  @Public()
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @ApiBearerAuth()
  @Roles(Role.USER)
  @Post('/create-post')
  async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
    const { title, content, videoUrl } = createPostDto;
    const { user } = req;
    return this.postsService.createPost(user, content, title, videoUrl);
  }
}
