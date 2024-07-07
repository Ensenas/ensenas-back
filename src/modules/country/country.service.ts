import { Injectable, Logger } from '@nestjs/common'
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

  async findOne(name: string): Promise<Country> {
    return await this._findByName(name.toLowerCase())
  }

  async remove(id: string) {
    return this.countryRepository.delete(id)
  }

  /************************ PRIVATE METHODS  ************************/

  private async _findByName(name: string): Promise<Country> {
    return this.countryRepository.findOneBy({ name: name })
  }
}
