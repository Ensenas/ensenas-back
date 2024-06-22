import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class SignInDTO {
  @IsEmail()
  @ApiProperty({
    example: 'example_id',
  })
  readonly mail: string

  @ApiProperty({
    example: '*********',
  })
  @IsNotEmpty()
  readonly password: string
}
