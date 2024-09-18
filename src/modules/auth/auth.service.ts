import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import Encryption from 'src/utils/Encryption'
import { SignInDTO } from './dto/sign-in.dto'
import { User } from '../users/models/user.entity'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  private readonly logger = new Logger(AuthService.name)

  async validateUser(pass: string, userPassword: string): Promise<any> {
    const match = await Encryption.getInstance().compare(pass, userPassword)
    if (!match) {
      return false
    }
    return true
  }

  async login(user: SignInDTO) {
    const userFound: User | null = await this.usersService.findOne(user.mail)

    if (!userFound) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'ENSEÑAS-BACK: USER OR PASSWORD ERROR',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const valid = await this.validateUser(user.password, userFound.password)

    if (valid) {
      const payload = {
        mail: userFound.mail,
        name: userFound.name,
        surname: userFound.surname,
        role: userFound.role,
      }
      const accessToken = await this.jwtService.signAsync(payload)
      return {
        access_token: accessToken,
        mail: userFound.mail,
        name: userFound.name,
        surname: userFound.surname,
        role: userFound.role,
      }
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'ENSEÑAS-BACK: VALIDATION FAILED',
        },
        HttpStatus.UNAUTHORIZED,
      )
    }
  }
}
