import { Module } from '@nestjs/common'
import { PathService } from './services/path.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Path } from '../users/models/path.entity'

@Module({
  providers: [PathService],
  imports: [TypeOrmModule.forFeature([Path])],
})
export class CommonModule {}
