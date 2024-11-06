import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Contenido del post' })
  content: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Título del post' })
  title: string;
}
