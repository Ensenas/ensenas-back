import { Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { LessonsService } from './lesson.service'
import { Public } from '../auth/decorators/public.decorator'

@Controller('lessons')
@ApiTags('Lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get('')
  @Public()
  findAll(@Req() request: Request) {
    return this.lessonsService.findAll(request)
  }

  @Post('delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id)
  }
}
