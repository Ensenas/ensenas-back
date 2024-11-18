import { Req } from '@nestjs/common'
import { Request } from 'express'
import { ApiTags } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'
import { PathService } from './services/path.service'
import { Public } from '../auth/decorators/public.decorator'

@Controller('common')
@ApiTags('Common')
export class CommonController {
  constructor(private readonly pathService: PathService) {}

  @Get('/paths')
  @Public()
  findAll(@Req() request: Request) {
    return this.pathService.findAll(request)
  }
}
