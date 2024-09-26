import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { Request } from 'express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Challenge } from './challenge.entity'
import { CompleteChallengeDto } from './dto/complete-challenge.dto'
import { UsersService } from '../users/users.service'

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge) private challengeRepository: Repository<Challenge>,
    private readonly userService: UsersService,
  ) {}

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

  /**
   * @dev Complete user challenge
   * @param dto
   */
  async completeChallenge(dto: CompleteChallengeDto, mail: string): Promise<any> {
    const challenge = await this._findOrThrow(dto.challengeId)
    console.log('CHALLENGE')
    console.log(challenge)
  }

  /************************ PRIVATE METHODS  ************************/

  private async _findOrThrow(id: string): Promise<Challenge> {
    const challengeFound = await this._findById(id)

    if (!challengeFound) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'ENSENAS-BACKEND: CHALLENGE NOT FOUND',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    return challengeFound
  }

  private async _findById(id: string): Promise<Challenge> {
    return this.challengeRepository.findOneBy({ id: parseInt(id) })
  }
}
