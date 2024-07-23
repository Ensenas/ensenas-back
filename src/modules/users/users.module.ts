import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from './models/user.entity'
import { Payment } from './models/payment.entity'
import { CountriesModule } from '../country/country.module'
import { UserProgress } from './models/userProgress.entity'
import { Path } from './models/path.entity'
import { Question } from './models/question.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Payment, UserProgress, Path, Question]),
    CountriesModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
