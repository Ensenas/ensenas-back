import { Injectable, Logger } from '@nestjs/common'
import { Request } from 'express'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Lesson } from './lesson.entity'

@Injectable()
export class LessonsService {
  constructor(@InjectRepository(Lesson) private lessonRepository: Repository<Lesson>) {}

  private readonly logger = new Logger(LessonsService.name)

  async findAll(request: Request): Promise<Lesson[]> {
    return this.lessonRepository.find(request.query)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async findOne(): Promise<void> {}

  async remove(id: string) {
    return this.lessonRepository.delete(id)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async create(): Promise<void> {}

  /************************ PRIVATE METHODS  ************************/

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private async _findByName(): Promise<void> {}
}
