import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './models/user.entity'
import { Payment } from './models/payment.entity'
import { CountriesModule } from '../country/country.module'

@Module({
  imports: [TypeOrmModule.forFeature([User, Payment]), CountriesModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
