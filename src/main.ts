import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { INestApplication, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      enableDebugMessages: true,
    }),
  )

  const options = new DocumentBuilder()
    .setTitle('AIFA Main Backend')
    .setDescription('AIFA bakend')
    .setVersion(process.env.VERSION ? process.env.VERSION : 'no-version')
    .addTag('v0.0.1-MVP')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
