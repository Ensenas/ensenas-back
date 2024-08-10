import { Injectable, Logger } from '@nestjs/common'
import { CreatedUserProgress, UpdatedUserProgress } from './interfaces'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserProgress } from './models/userProgress.entity'
import { User } from './models/user.entity'
import EnsenasError from '../../utils/Error'
import { PathService } from '../common/services/path.service'

@Injectable()
export class UserProgressService {
  constructor(
    @InjectRepository(UserProgress) private userProgressRepository: Repository<UserProgress>,
    private readonly pathService: PathService,
  ) {}

  private readonly logger = new Logger(UserProgressService.name)

  async create(user: User, pathName: string): Promise<CreatedUserProgress> {
    this.logger.debug('Start user progress creation...')

    const userPath = await this._findUser(user)
    if (userPath) {
      throw EnsenasError.fromMessage('User has already a user path')
    }
    const path = await this.pathService.getPath(pathName)
    const res = await this.userProgressRepository.save({
      path: path,
      user,
      points: 0,
    })

    this.logger.debug('User path created...')
    this.logger.debug(res)

    return {
      id: res.id,
      points: res.points,
      path: res.path,
    }
  }

  async update(user: User, pathName: string): Promise<UpdatedUserProgress> {
    this.logger.debug('Start user progress update...')

    const userPath = await this._findUser(user)
    if (!userPath) {
      throw EnsenasError.fromMessage('User has no path!')
    }
    const path = await this.pathService.getPath(pathName)

    userPath.path = path
    const res = await this.userProgressRepository.save(userPath)

    this.logger.debug('User path updated...')
    this.logger.debug(res)

    return {
      id: res.id,
      points: res.points,
      path: res.path,
    }
  }

  /************************ PRIVATE METHODS  ************************/
  private async _findUser(user: User): Promise<UserProgress> {
    return this.userProgressRepository.findOneBy({ user: user })
  }
}
