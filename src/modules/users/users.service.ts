import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Request } from 'express'

import { CreatedUser, CreateUserDTO } from './dto/create-user.dto'
import { User } from './models/user.entity'
import Encryption from 'src/utils/Encryption'
import { CreatedUserProgress, Role, UpdatedUserProgress } from './interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CountryService } from '../country/country.service'
import { SetUserPathDTO } from './dto/set-path.dto'
import { UserProgressService } from './userProgress.service'
import { Payment } from './models/payment.entity'
import { PaymentSuscription } from './interfaces/payment'
import { UpdateUserProfileDTO } from './dto/update-user-profile.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Payment) private paymentRepository: Repository<Payment>,
    private readonly countryService: CountryService,
    private readonly userProgressService: UserProgressService,
  ) {}

  private readonly logger = new Logger(UsersService.name)

  async create(createUserDTO: CreateUserDTO): Promise<CreatedUser> {
    this.logger.debug(`Start creation of user ${createUserDTO.name}...`)
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
      role: Role.USER,
    })

    return {
      id: res.id,
      mail: mail,
      name: name,
      surname: surname,
      country: foundCountry.name,
    }
  }

  async findAll(request: Request): Promise<Partial<User>[]> {
    const users: User[] = await this.userRepository.find(request.query)
    const partialUsers = users.map((user) => {
      return {
        id: user.id,
        mail: user.mail,
        name: user.name,
        surname: user.surname,
        active: user.active,
        role: user.role,
      }
    })
    return partialUsers
  }

  async findOne(mail: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { mail },
      relations: ['country'],
    })

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'ENSEÑAS-BACKEND: USER NOT FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return user
  }

  async remove(id: string) {
    return this.userRepository.delete(id)
  }

  async setPath(mail: string, userPathDTO: SetUserPathDTO): Promise<CreatedUserProgress> {
    console.log('ME METO EN EL SET PATH')
    const user = await this._findOrThrow(mail)
    console.log(user)
    const { path } = userPathDTO
    console.log(path)
    return await this.userProgressService.create(user, path)
  }

  async updatePath(mail: string, userPathDTO: SetUserPathDTO): Promise<UpdatedUserProgress> {
    const user = await this._findOrThrow(mail)
    const { path: newPath } = userPathDTO
    return await this.userProgressService.update(user, newPath)
  }

  async getPath(mail: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { mail },
      relations: ['userProgress', 'userProgress.path'],
    })

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'ENSEÑAS-BACKEND: USER NOT FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return user.userProgress.path.title
  }

  async registerPayment(mail: string, suscriptionType: PaymentSuscription): Promise<Payment> {
    const user = await this.userRepository.findOne({
      where: { mail },
      relations: ['payments'],
    })

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'ENSEÑAS-BACKEND: USER NOT FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    const newPayment = this.paymentRepository.create({
      user,
      suscription: suscriptionType,
      date: new Date(), // Se asigna la fecha actual
    })

    this.paymentRepository.save(newPayment)
    return newPayment
  }

  async getPayment(mail: string): Promise<Payment[]> {
    const user = await this.userRepository.findOne({
      where: { mail },
      relations: ['payments'], // Carga la relación de pagos
    })

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'ENSEÑAS-BACKEND: USER NOT FOUND',
        },
        HttpStatus.NOT_FOUND,
      )
    }

    return user.payments
  }

  async updateUserProfile(mail: string, updateUserProfileDTO: UpdateUserProfileDTO): Promise<User> {
    const user = await this._findOrThrow(mail)

    const { name, surname, birthDate, country } = updateUserProfileDTO

    // Create update object with only provided values
    const updates: Partial<User> = {
      ...(name && { name }),
      ...(surname && { surname }),
      ...(birthDate && { birth_date: new Date(birthDate) }),
    }

    // Merge updates with existing user
    Object.assign(user, updates)

    if (country) {
      const foundCountry = await this.countryService.findOne(country)
      if (!foundCountry) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'ENSEÑAS-BACKEND: COUNTRY NOT FOUND',
          },
          HttpStatus.BAD_REQUEST,
        )
      }
      user.country = foundCountry
    }

    await this.userRepository.save(user)
    return user
  }

  async updateUserPassword(
    mail: string,
    password: string,
    markToResetPassword?: boolean,
  ): Promise<User> {
    const user = await this._findOrThrow(mail)
    user.password = await Encryption.getInstance().hash(password)
    user.resetPassword = markToResetPassword || false
    await this.userRepository.save(user)
    return user
  }

  /************************ PRIVATE METHODS  ************************/

  private async _findOrThrow(mail: string): Promise<User> {
    const userFound = await this._findByMail(mail)

    if (!userFound) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'ENSENAS-BACKEND: USER NOT FOUND',
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
