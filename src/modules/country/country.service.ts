import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Request } from 'express'

import { Country } from './country.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class CountryService {
  constructor(@InjectRepository(Country) private countryRepository: Repository<Country>) {}

  private readonly logger = new Logger(CountryService.name)

  async findAll(request: Request): Promise<Country[]> {
    return this.countryRepository.find(request.query)
  }

  async remove(id: string) {
    return this.countryRepository.delete(id)
  }
}
