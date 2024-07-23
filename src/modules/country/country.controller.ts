import { Body, HttpCode, HttpStatus, Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { CountryService } from './country.service'
import { Public } from '../auth/decorators/public.decorator'
import { Role } from '../users/interfaces'
import { CreateCountryDto } from './dto/create.dto'
import { Roles } from '../auth/decorators/roles.decorator'

@Controller('countries')
@ApiTags('Countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@Req() request: Request) {
    return this.countryService.findAll(request)
  }

  @Post('')
  @Roles(Role.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto)
  }

  @Post('delete')
  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(id)
  }
}
