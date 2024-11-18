import { Injectable, Logger } from '@nestjs/common'
import { Request } from 'express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Unit } from './unit.entity'

@Injectable()
export class UnitsService {
  constructor(@InjectRepository(Unit) private unitRepository: Repository<Unit>) {}

  private readonly logger = new Logger(UnitsService.name)

  async findAll(request: Request): Promise<Unit[]> {
    return this.unitRepository.find(request.query)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async findOne(): Promise<void> {}

  async remove(id: string) {
    return this.unitRepository.delete(id)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async create(): Promise<void> {}

  /************************ PRIVATE METHODS  ************************/

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private async _findByName(): Promise<void> {}
}
