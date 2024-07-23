import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Challenge } from './challenge.entity'
import { ChallengesService } from './challenge.service'
import { ChallengeController } from './challenge.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Challenge])],
  providers: [ChallengesService],
  controllers: [ChallengeController],
})
export class ChallengesModule {}
