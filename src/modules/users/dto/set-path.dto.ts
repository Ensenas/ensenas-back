import { ApiProperty } from '@nestjs/swagger'
import { IsEnum } from 'class-validator'
import { LearningPath } from '../../common/types'

export class SetUserPathDTO {
  @IsEnum(LearningPath)
  @ApiProperty({
    example: 'EXPERT',
  })
  readonly path: LearningPath
}
