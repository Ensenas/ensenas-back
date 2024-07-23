import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Unit } from './unit.entity'
import { UnitsService } from './unit.service'
import { UnitsController } from './unit.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  providers: [UnitsService],
  controllers: [UnitsController],
})
export class UnitsModule {}
