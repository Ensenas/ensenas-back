import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty } from 'class-validator'
import { PaymentSuscription } from '../interfaces/payment'

export class RegisterPaymentDto {
  @IsNotEmpty()
  @IsEnum(PaymentSuscription)
  @ApiProperty({ description: 'Tipo de suscripción' })
  suscriptionType: PaymentSuscription
}
