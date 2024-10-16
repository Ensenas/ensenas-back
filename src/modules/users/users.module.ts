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
import { UserProgressService } from './userProgress.service'
import { PathService } from '../common/services/path.service'
import { UserChallengeProgress } from './models/userChallengeProgress.entity'
import { UserChallengeProgressService } from './userChallengeProgress.service';
import { Challenge } from '../challenges/challenge.entity';
import { ChallengesModule } from '../challenges/challenge.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Payment, UserProgress, Path, Question, UserChallengeProgress, Challenge]),
    CountriesModule,
    ChallengesModule
  ],
  providers: [UsersService, UserProgressService, PathService, UserChallengeProgressService],
  controllers: [UsersController],
  exports: [UsersService, UserChallengeProgressService],
})
export class UsersModule {}
