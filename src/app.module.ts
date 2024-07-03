import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountriesModule } from './modules/country/country.module'
import { configService as ConfigService } from './config/config.service'

@Module({
  imports: [TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()), UsersModule, CountriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
