import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './modules/users/users.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountriesModule } from './modules/country/country.module'
import { AuthModule } from './modules/auth/auth.module'
import { CommonModule } from './modules/common/common.module'
import { configService as ConfigService } from './config/config.service'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import { RolesGuard } from './modules/auth/guards/roles.guard'
import { UnitsModule } from './modules/units/unit.module'
import { LessonsModule } from './modules/lessons/lesson.module'
import { ChallengesModule } from './modules/challenges/challenge.module'
import { PostsModule } from './modules/posts/posts.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(ConfigService.getTypeOrmConfig()),
    UsersModule,
    AuthModule,
    CountriesModule,
    CommonModule,
    UnitsModule,
    LessonsModule,
    ChallengesModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
