import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import * as process from 'node:process';
import {
  DatabaseProviderType,
  EnvironmentTypes,
} from '../enums/environment.enum';

export const getDatabaseProviderType = (): DatabaseProviderType => {
  const env = process.env.APP_ENV as EnvironmentTypes;
  switch (env) {
    case EnvironmentTypes.DEV:
      return DatabaseProviderType.DEV;
    case EnvironmentTypes.TEST:
      return DatabaseProviderType.TEST;
    case EnvironmentTypes.PROD:
      return DatabaseProviderType.PROD;
    default:
      throw new Error(`Option ${process.env.APP_ENV} not supported`);
  }
};

export const getDatabaseProvider = () => {
  const providerType = getDatabaseProviderType();
  if (providerType === DatabaseProviderType.PROD) return databaseProdProvider;
  if (providerType === DatabaseProviderType.DEV) return databaseDevProvider;
  return databaseTestProvider;
};

export const getCommonDatabaseConfig = (config: ConfigService) => ({
  host: config.get('databaseConfig.dbHost'),
  port: config.get('databaseConfig.dbPort'),
  username: config.get('databaseConfig.username'),
  password: config.get('databaseConfig.password'),
  database: config.get('databaseConfig.dbName'),
  entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
});

const databaseTestProvider: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'sqlite',
    database: config.get('databaseConfig.dbName'),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: true,
    migrationsTableName: '_migrations',
    migrationsRun: true, // Auto-run migrations
    logging: true,
  }),
  inject: [ConfigService],
};

const databaseDevProvider: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: config.get('databaseConfig.dbEngine'),
    ...getCommonDatabaseConfig(config),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: true,
    migrationsTableName: '_migrations',
    migrationsRun: true, // Auto-run migrations
    logging: config.get('databaseConfig.debug'),
  }),
  inject: [ConfigService],
};

const databaseProdProvider: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: config.get('databaseConfig.dbEngine'),
    ...getCommonDatabaseConfig(config),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: ['/migrations/*{.ts,.js}'],
    migrationsTableName: '_migrations',
    migrationsRun: true, // Auto-run migrations
    logging: false,
  }),
  inject: [ConfigService],
};
