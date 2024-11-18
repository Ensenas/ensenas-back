import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateUserChallengeProgressDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'ID del desafío que se está actualizando', example: '1' })
  challengeId: string

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Indica si el desafío ha sido iniciado', required: false })
  started?: boolean

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ description: 'Indica si el desafío ha sido completado', required: false })
  completed?: boolean

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Fecha de actualización (opcional)',
    required: false,
    example: '2024-10-18T12:34:56Z',
  })
  updatedAt?: string
}
