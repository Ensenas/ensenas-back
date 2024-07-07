import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsEmail()
  @ApiProperty({
    example: 'example@gmail.com',
  })
  readonly mail: string

  @IsNotEmpty()
  @ApiProperty({
    example: 'Buffer & hashed password',
  })
  password: string

  @IsString()
  @ApiProperty({
    required: true,
    description: 'Name',
  })
  name: string

  @IsString()
  @ApiProperty({
    required: true,
    description: 'Surname',
  })
  surname: string

  @IsDateString()
  @ApiProperty({
    required: true,
    description: 'Birth Date',
  })
  birthDate: Date

  @IsString()
  @ApiProperty({
    required: true,
    description: 'User country',
  })
  country: string
}

export interface CreatedUser {
  mail: string
  name: string
  surname: string
  country: string
}
