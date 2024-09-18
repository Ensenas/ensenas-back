import { Body, Post, Put, Req, Request } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { Roles } from '../auth/decorators/roles.decorator'
import { Role } from './interfaces'
import { SetUserPathDTO } from './dto/set-path.dto'
import { UserInfo } from '../users/interfaces'

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

  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req): Promise<UserInfo> {
    const { mail, username } = req.user
    const userInfo = await this.usersService.findOne(mail)
    return {
      mail: mail,
      username: username,
      name: userInfo.name,
      surname: userInfo.surname,
      country: userInfo.country.name,
    }
  }
}
