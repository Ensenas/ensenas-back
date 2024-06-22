import { Req } from '@nestjs/common'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { Roles } from '../auth/decorators/roles.decorator'
import { Role } from './interfaces'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.ADMIN)
  findAll(@Req() request: Request) {
    return this.usersService.findAll(request)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
