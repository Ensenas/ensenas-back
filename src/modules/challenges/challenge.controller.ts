import { Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { ChallengesService } from './challenge.service'

@Controller('challenges')
@ApiTags('Challenges')
export class ChallengeController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get()
  findAll(@Req() request: Request) {
    return this.challengesService.findAll(request)
  }

  @Post('delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengesService.remove(id)
  }
}