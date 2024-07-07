import { Req } from '@nestjs/common'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { Roles } from '../auth/decorators/roles.decorator'
import { Role } from './interfaces'
import { Public } from '../auth/decorators/public.decorator'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  //@Roles(Role.ADMIN)
  findAll(@Req() request: Request) {
    return this.usersService.findAll(request)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }
}
