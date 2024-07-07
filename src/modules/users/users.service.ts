import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Request } from 'express'

import { CreatedUser, CreateUserDTO } from './dto/create-user.dto'
import { User } from './models/user.entity'
import Encryption from 'src/utils/Encryption'
import { Role } from './interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CountryService } from '../country/country.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly countryService: CountryService,
  ) {}

  private readonly logger = new Logger(UsersService.name)

  async create(createUserDTO: CreateUserDTO): Promise<CreatedUser> {
    if (await this._findByMail(createUserDTO.mail)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'ENSEÑAS-BACKEND: USER ALREADY REGISTERED',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const passwordHash = await Encryption.getInstance().hash(createUserDTO.password)

    const { mail, name, surname, birthDate, country: countryName } = createUserDTO

    const foundCountry = await this.countryService.findOne(countryName)
    if (!foundCountry) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'ENSEÑAS-BACKEND: COUNTRY NOT FOUND',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const res = await this.userRepository.save({
      mail,
      name,
      surname,
      birth_date: birthDate,
      password: passwordHash,
      country: foundCountry,
      roles: [Role.USER],
    })

    return {
      id: res.id,
      mail: mail,
      name: name,
      surname: surname,
      country: foundCountry.name,
    }
  }

  async findAll(request: Request): Promise<User[]> {
    return this.userRepository.find(request.query)
  }

  async findOne(mail: string): Promise<User> {
    return await this._findByMail(mail)
  }

  async remove(id: string) {
    return this.userRepository.delete(id)
  }

  /************************ PRIVATE METHODS  ************************/

  private async _findOrThrow(mail: string): Promise<User> {
    const userFound = await this._findByMail(mail)

    if (!userFound) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'FONDER-BACKEND: USER NOT FOUND',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    return userFound
  }

  private async _findByMail(mail: string): Promise<User> {
    return this.userRepository.findOneBy({ mail: mail })
  }
}
