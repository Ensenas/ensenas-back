import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class RecoverPasswordDTO {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address for password recovery',
  })
  readonly mail: string
}
