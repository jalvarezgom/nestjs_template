import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { App_1Module } from './app_1/app_1.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  configuration,
  getEnvironmentFileNameByEnvVariable,
} from './core/config/configuration';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { getDatabaseProvider } from './core/providers/database.provider';
import { WinstonModule } from 'nest-winston';

import { getLoggerProvider } from './core/providers/logger.provider';
import { ResponseMiddleware } from './core/middlewares/response.middleware';
import { CacheModule } from '@nestjs/cache-manager';
import { getCacheProvider } from './core/providers/cache.provider';
import { ExampleCommand } from './tasks/example.task';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironmentFileNameByEnvVariable(),
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(getDatabaseProvider()),
    WinstonModule.forRootAsync(getLoggerProvider()),
    CacheModule.registerAsync(getCacheProvider()),
    AuthModule,
    App_1Module,
    CoreModule,
  ],
  controllers: [],
  providers: [ExampleCommand],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(ResponseMiddleware).forRoutes('{*splat}');
  }
}
