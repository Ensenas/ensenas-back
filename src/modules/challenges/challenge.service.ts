import { Injectable, Logger } from '@nestjs/common'
import { Request } from 'express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Challenge } from './challenge.entity'

@Injectable()
export class ChallengesService {
  constructor(@InjectRepository(Challenge) private challengeRepository: Repository<Challenge>) {}

  private readonly logger = new Logger(ChallengesService.name)

  async findAll(request: Request): Promise<Challenge[]> {
    return this.challengeRepository.find(request.query)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async findOne(): Promise<void> {}

  async remove(id: string) {
    return this.challengeRepository.delete(id)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async create(): Promise<void> {}

  /************************ PRIVATE METHODS  ************************/

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private async _findByName(): Promise<void> {}
}
