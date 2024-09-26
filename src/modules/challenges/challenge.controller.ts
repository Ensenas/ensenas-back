import { Body, Post, Req, Request } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { ChallengesService } from './challenge.service'
import { Public } from '../auth/decorators/public.decorator'
import { CompleteChallengeDto } from './dto/complete-challenge.dto'
import { Roles } from '../auth/decorators/roles.decorator'
import { Role } from '../users/interfaces'

@Controller('challenges')
@ApiTags('Challenges')
export class ChallengeController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get('')
  @Public()
  findAll(@Req() request: ExpressRequest) {
    return this.challengesService.findAll(request)
  }

  @Post('delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.challengesService.remove(id)
  }

  @Post('/complete')
  @Roles(Role.USER)
  completeChallenge(@Body() completeChallengeDto: CompleteChallengeDto, @Request() req) {
    const { mail } = req.user
    return this.challengesService.completeChallenge(completeChallengeDto, mail)
  }
}
