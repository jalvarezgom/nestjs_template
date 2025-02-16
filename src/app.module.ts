import { Module } from '@nestjs/common';
import { App_1Module } from './app_1/app_1.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  configuration,
  getEnvironmentFileNameByEnvVariable,
} from './core/config/configuration';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { getDatabaseProvider } from './core/providers/databaseProvider';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironmentFileNameByEnvVariable(),
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync(getDatabaseProvider()),
    AuthModule,
    App_1Module,
    CoreModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
