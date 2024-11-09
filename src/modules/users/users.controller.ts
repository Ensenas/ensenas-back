import { Body, Post, Put, Req, Request, Patch } from '@nestjs/common'
import { Request as ExpressRequest } from 'express'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Param, Delete } from '@nestjs/common'
import { UsersService } from './users.service'
import { Roles } from '../auth/decorators/roles.decorator'
import { Role } from './interfaces'
import { SetUserPathDTO } from './dto/set-path.dto'
import { UserInfo } from '../users/interfaces'
import { ChallengesService } from '../challenges/challenge.service';
import { CompleteChallengeDto } from '../challenges/dto/complete-challenge.dto';
import { RegisterPaymentDto } from './dto/register-payment.dto'
import { UpdateUserProfileDTO } from './dto/update-user-profile.dto'

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly challengeService: ChallengesService,
  ) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.ADMIN)
  findAll(@Req() request: ExpressRequest) {
    return this.usersService.findAll(request)
  }

  @Post('/path')
  @ApiBearerAuth()
  @Roles(Role.USER)
  setPath(@Body() userPathDTO: SetUserPathDTO, @Request() req) {
    const { mail } = req.user
    return this.usersService.setPath(mail, userPathDTO)
  }

  @Put('/update-path')
  @ApiBearerAuth()
  @Roles(Role.USER)
  updatePath(@Body() userPathDTO: SetUserPathDTO, @Request() req) {
    const { mail } = req.user
    return this.usersService.updatePath(mail, userPathDTO)
  }

  @Get('/path/current')
  @ApiBearerAuth()
  @Roles(Role.USER)
  currentPath(@Request() req) {
    const { mail } = req.user
    return this.usersService.getPath(mail)
  }

  @Post('delete')
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }

  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@Request() req): Promise<UserInfo> {
    const { mail, username } = req.user
    const userInfo = await this.usersService.findOne(mail)
    return {
      mail: mail,
      username: username,
      name: userInfo.name,
      birthDate: userInfo.birth_date,
      surname: userInfo.surname,
      country: userInfo.country.name,
    }
  }


  @Patch('/profile')
  @ApiBearerAuth()
  @Roles(Role.USER)
  async updateProfile(
    @Request() req,
    @Body() updateUserProfileDTO: UpdateUserProfileDTO,
  ) {
    const { mail } = req.user
    return this.usersService.updateUserProfile(mail, updateUserProfileDTO)
  }

  @Post('/complete-challenge')
  @ApiBearerAuth()
  @Roles(Role.USER)
  async completeChallenge(@Body() completeChallengeDto: CompleteChallengeDto, @Request() req) {
    const {mail} = req.user; // Pasar el correo del usuario autenticado al DTO
    const progress=this.challengeService.completeChallenge(completeChallengeDto, mail);
    return progress
  }

  @Get('/challenge-progress')
  @ApiBearerAuth()
  @Roles(Role.USER)
  async getUserChallengeProgress(@Request() req) {
    const { mail } = req.user // Obtener el correo del usuario autenticado
    return this.challengeService.getProgressByUser(mail)
  }

  @Post('/register-payment')
  @ApiBearerAuth()
  @Roles(Role.USER)
  async registerPayment(
    @Request() req,
    @Body() registerPaymentDto: RegisterPaymentDto,
  ) {
    const { mail } = req.user;
    return this.usersService.registerPayment(mail, registerPaymentDto.suscriptionType);
  }

  @Get('/get-payment')
  @ApiBearerAuth()
  @Roles(Role.USER)
  async getPayment(@Request() req){
    const { mail } = req.user;
    return this.usersService.getPayment(mail);
  }
}
