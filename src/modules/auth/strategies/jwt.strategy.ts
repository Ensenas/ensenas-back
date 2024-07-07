import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    if (!process.env.JWT_SECRET) {
      throw Error('PLEASE PROVIDE JWT SECRET')
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: process.env.DISABLE_BEARER_EXP ? true : false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  private readonly logger = new Logger(JwtStrategy.name)

  /**
   * @dev Validate payload
   * @param payload
   * @dev username: Username
   * @dev mail: User mail
   * @dev roles: User roles (default to user)
   * @returns
   */
  async validate(payload: any) {
    return {
      mail: payload.mail,
      username: payload.name + ' ' + payload.surname,
      roles: payload.roles,
    }
  }
}
