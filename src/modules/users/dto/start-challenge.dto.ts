import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'

export class StartChallengeDTO {
  @IsNumber()
  @ApiProperty({
    example: '1',
  })
  readonly challengeId: number
}
