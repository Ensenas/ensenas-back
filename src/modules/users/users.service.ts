import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Request } from 'express'

import { CreateUserDTO } from './dto/create-user.dto'
import { User } from './user.entity'
import Encryption from 'src/utils/Encryption'
import { Role } from './interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  private readonly logger = new Logger(UsersService.name)

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    if (await this._findByMail(createUserDTO.mail)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'AIFA-BACKEND: USER ALREADY REGISTERED',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const passwordHash = await Encryption.getInstance().hash(createUserDTO.password)

    createUserDTO.password = passwordHash
    createUserDTO.username = createUserDTO.mail.split('@')[0]
    createUserDTO.roles = [Role.USER]

    /** TODO: MODIFY THIS RESPONSE TO JUST RETURN USER DATA AND NOT ALL INFO */
    return this.userRepository.create(createUserDTO)
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
