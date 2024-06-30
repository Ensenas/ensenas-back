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

  async validate(payload: any) {
    return { username: payload.username, mail: payload.mail, roles: payload.roles }
  }
}
