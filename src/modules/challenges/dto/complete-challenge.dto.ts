import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CompleteChallengeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    required: true,
    example: 'Challenge id',
  })
  challengeId: string

  @IsBoolean()
  @ApiProperty({
    required: true,
    description: 'Challenge result',
  })
  result: boolean
}
