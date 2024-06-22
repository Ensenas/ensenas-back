import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

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
    required: false,
    description: 'User name',
  })
  username?: string

  // @dev: This value is added internally and thus it is not required to be sent.
  @ApiProperty({
    required: false,
    description: 'Users role',
  })
  roles?: string[]
}
