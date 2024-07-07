import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class CreateCountryDto {
  @IsEmail()
  @ApiProperty({
    description: 'Country name',
  })
  readonly name: string
}
