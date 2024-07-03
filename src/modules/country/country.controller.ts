import { Req } from '@nestjs/common'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { CountryService } from './country.service'

@Controller('countries')
@ApiTags('Countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  findAll(@Req() request: Request) {
    return this.countryService.findAll(request)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(id)
  }
}
