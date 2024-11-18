import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Request } from 'express'

import { Country } from './country.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCountryDto } from './dto/create.dto'

@Injectable()
export class CountryService {
  constructor(@InjectRepository(Country) private countryRepository: Repository<Country>) {}

  private readonly logger = new Logger(CountryService.name)

  async findAll(request: Request): Promise<Country[]> {
    const countries = await this.countryRepository.find(request.query)
    const uppercasedCountries = countries.map((country) => {
      return {
        ...country,
        name: country.name.charAt(0).toUpperCase() + country.name.slice(1),
      }
    })
    return uppercasedCountries
  }

  async findOne(name: string): Promise<Country> {
    return await this._findByName(name.toLowerCase())
  }

  async remove(id: string) {
    return this.countryRepository.delete(id)
  }

  async create(country: CreateCountryDto): Promise<void> {
    const { name } = country
    const foundCountry = await this._findByName(name.toLowerCase())
    if (foundCountry) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'ENSEÑAS-BACKEND: COUNTRY ALREADY EXISTS',
        },
        HttpStatus.BAD_REQUEST,
      )
    }
    await this.countryRepository.save({ name })
  }

  /************************ PRIVATE METHODS  ************************/

  private async _findByName(name: string): Promise<Country> {
    return this.countryRepository.findOneBy({ name: name })
  }
}
