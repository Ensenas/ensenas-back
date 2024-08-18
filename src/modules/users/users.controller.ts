import { Body, Post, Put, Req, Request } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { Roles } from '../auth/decorators/roles.decorator'
import { Role } from './interfaces'
import { SetUserPathDTO } from './dto/set-path.dto'
import { StartChallengeDTO } from './dto/start-challenge.dto'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  findAll(@Req() request: ExpressRequest) {
    return this.usersService.findAll(request)
  }

  @Post('/path')
  @ApiBearerAuth()
  @Roles(Role.USER)
  setPath(@Body() userPathDTO: SetUserPathDTO, @Request() req) {
    const { mail } = req.user
    return this.usersService.setPath(mail, userPathDTO)
  }

  @Put('/update-path')
  @ApiBearerAuth()
  @Roles(Role.USER)
  updatePath(@Body() userPathDTO: SetUserPathDTO, @Request() req) {
    const { mail } = req.user
    return this.usersService.updatePath(mail, userPathDTO)
  }

  @Post('delete')
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }

  @Post('start-challenge')
  @ApiBearerAuth()
  @Roles(Role.USER)
  startChallenge(@Body() startChallengeDTO: StartChallengeDTO, @Request() req) {
    const { mail } = req.user
    return this.usersService.startChallenge(mail, startChallengeDTO)
  }
}
