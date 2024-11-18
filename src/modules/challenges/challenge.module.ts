import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Challenge } from './challenge.entity'
import { ChallengesService } from './challenge.service'
import { ChallengeController } from './challenge.controller'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [TypeOrmModule.forFeature([Challenge]), forwardRef(() => UsersModule)],
  providers: [ChallengesService],
  controllers: [ChallengeController],
  exports: [ChallengesService],
})
export class ChallengesModule {}
