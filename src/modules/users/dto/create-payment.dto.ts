import { ApiProperty } from '@nestjs/swagger'
import { IsUUID, IsEnum, IsOptional } from 'class-validator'

export class CreatePaymentDto {
  @IsEnum(['BASIC', 'PREMIUM']) // Ajusta estos valores según el enum que uses en tu base de datos
  @ApiProperty({ description: 'Tipo de suscripción' })
  subscription: 'BASIC' | 'PREMIUM' | 'VIP'

  @IsOptional()
  @ApiProperty({ description: 'Fecha del pago', required: false })
  date?: Date
}
