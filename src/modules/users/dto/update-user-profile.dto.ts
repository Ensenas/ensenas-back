// src/users/dto/update-user-profile.dto.ts
import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateUserProfileDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    surname?: string;

    @IsOptional()
    @IsDateString()
    birthDate?: string;

    @IsOptional()
    @IsString()
    country?: string;
}
