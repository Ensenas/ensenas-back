import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { configService as ConfigService } from './config/config.service'
import { CountryController } from './country/country.controller';

@Module({
  imports: [TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()), UsersModule],
  controllers: [AppController, CountryController],
  providers: [AppService],
})
export class AppModule {}
