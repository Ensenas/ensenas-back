import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersService } from '../users/users.service'
import { CreateUserDTO } from '../users/dto/create-user.dto'
import { SignInDTO } from './dto/sign-in.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Public } from './decorators/public.decorator'

@Controller('auth')
@ApiTags('Authorization')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  signUp(@Body() signUpDto: CreateUserDTO) {
    return this.usersService.create(signUpDto)
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.login(signInDto)
  }

  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user
  }
}
