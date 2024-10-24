// src/config/config.service.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key]
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`)
    }

    return value
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true))
    return this
  }

  public isProduction() {
    const mode = this.getValue('MODE', false)
    return mode != 'DEV'
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      url: this.getValue('POSTGRES_URL'),

      entities: ['**/**/*.entity{.ts}'],

      migrationsTableName: 'migrations',

      migrations: ['dist/migrations/*'],

      autoLoadEntities: true,

      synchronize: false,

      ssl: this.isProduction(),
    }
  }
}

const configService = new ConfigService(process.env).ensureValues(['POSTGRES_URL'])

export { configService }
