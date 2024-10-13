import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Challenge } from './challenge.entity';
import { CompleteChallengeDto } from './dto/complete-challenge.dto';
import { UsersService } from '../users/users.service';
import { UserChallengeProgressService } from '../users/userChallengeProgress.service';
import { UserChallengeProgress } from '../users/models/userChallengeProgress.entity';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(Challenge) private challengeRepository: Repository<Challenge>,
    private readonly userChallengeProgressService: UserChallengeProgressService,
    private readonly userService: UsersService,
  ) {}

  private readonly logger = new Logger(ChallengesService.name);

  async findAll(request: Request): Promise<Challenge[]> {
    return this.challengeRepository.find(request.query);
  }

  async findOne(id: string): Promise<Challenge> {
    return this._findOrThrow(id);
  }

  async remove(id: string) {
    return this.challengeRepository.delete(id);
  }

  async create(challengeData: Partial<Challenge>): Promise<Challenge> {
    const newChallenge = this.challengeRepository.create(challengeData);
    return this.challengeRepository.save(newChallenge);
  }

  /**
   * @dev Complete user challenge
   * @param dto
   * @param mail
   */
  async completeChallenge(dto: CompleteChallengeDto, mail: string): Promise<void> {
    // Buscar al usuario por email
    const user = await this.userService.findOne(mail);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Delegar la actualización o creación del progreso del desafío
    await this.userChallengeProgressService.findOrUpdateProgress(user, dto);
  }

  async getProgressByUser(mail: string): Promise<UserChallengeProgress[]> {

    const user = await this.userService.findOne(mail);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const challenges = await this.userChallengeProgressService.getProgressByUser(user);
    return challenges
  }

  /************************ PRIVATE METHODS  ************************/

  private async _findOrThrow(id: string): Promise<Challenge> {
    const challengeFound = await this._findById(id);

    if (!challengeFound) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'ENSENAS-BACKEND: CHALLENGE NOT FOUND',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return challengeFound;
  }

  private async _findById(id: string): Promise<Challenge> {
    return this.challengeRepository.findOneBy({ id: parseInt(id) });
  }
}
