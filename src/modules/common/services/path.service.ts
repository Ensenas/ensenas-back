import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Request } from 'express'
import { Path } from '../../users/models/path.entity'
import EnsenasError from '../../../utils/Error'
import { StatusCode } from '../../../utils'

@Injectable()
export class PathService {
  constructor(@InjectRepository(Path) private pathRepository: Repository<Path>) {}

  private readonly logger = new Logger(PathService.name)

  async getPath(name: string): Promise<Path> {
    const foundPath = await this._findPath(name)
    if (!foundPath) {
      throw EnsenasError.fromStatusAndMessage(StatusCode.ERROR_NOT_FOUND, 'Path not found')
    }
    return foundPath
  }

  async findAll(request: Request): Promise<Path[]> {
    return this.pathRepository.find(request.query)
  }
  /************************ PRIVATE METHODS  ************************/
  private async _findPath(pathName: string): Promise<Path> {
    return this.pathRepository.findOneBy({ title: pathName })
  }
}
