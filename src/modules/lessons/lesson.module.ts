import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Lesson } from './lesson.entity'
import { LessonsService } from './lesson.service'
import { LessonsController } from './lesson.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Lesson])],
  providers: [LessonsService],
  controllers: [LessonsController],
})
export class LessonsModule {}
