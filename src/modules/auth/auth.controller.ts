import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { CreateUserDTO } from '../users/dto/create-user.dto'
import { SignInDTO } from './dto/sign-in.dto'
import { ApiTags } from '@nestjs/swagger'
import { Public } from './decorators/public.decorator'

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  signUp(@Body() signUpDto: CreateUserDTO) {
    return this.usersService.create(signUpDto)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.login(signInDto)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('google-login')
  async googlLogIn(@Body() signUpDto: CreateUserDTO) {
    try {
      const existingUser = await this.usersService.findOne(signUpDto.mail)

      return this.authService.login(signUpDto)
    } catch (error) {
      await this.usersService.create(signUpDto)

      return this.authService.login(signUpDto)
    }
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('recover-password')
  async recoverPassword(@Body() { mail }: { mail: string }) {
    return this.authService.initiatePasswordRecovery(mail)
  }
}
