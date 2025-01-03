import { Post, Req } from '@nestjs/common'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { UnitsService } from './unit.service'
import { Public } from '../auth/decorators/public.decorator'

@Controller('units')
@ApiTags('Units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  @Public()
  findAll(@Req() request: Request) {
    return this.unitsService.findAll(request)
  }

  @Post('delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.unitsService.remove(id)
  }
}
