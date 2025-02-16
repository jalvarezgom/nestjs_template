import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { EnvironmentTypes } from '../config/environment';

export const getDatabaseProviderType = () => {
  return [EnvironmentTypes.DEV, EnvironmentTypes.TEST].includes(
    process.env.APP_ENV as EnvironmentTypes,
  )
    ? 'databaseDevProvider'
    : 'databaseProdProvider';
};

export const getDatabaseProvider = () => {
  switch (getDatabaseProviderType()) {
    case 'databaseDevProvider':
      return databaseDevProvider;
    case 'databaseProdProvider':
      return databaseProdProvider;
  }
};

const databaseDevProvider: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'sqlite',
    database: config.get('databaseConfig.dbName'),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    // autoLoadEntities: true,
    synchronize: true,
    logging: true,
    // migrations: [__dirname + '/../../migrations/*.{ts,js}'],
    // migrationsRun: true,
    // dropSchema: true,
  }),
  inject: [ConfigService],
};

const databaseProdProvider: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (config: ConfigService) => ({
    type: 'sqlite',
    database: config.get('databaseConfig.dbName'),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // autoLoadEntities: true,
    synchronize: config.get('app.env') === EnvironmentTypes.DEV,
    logging: config.get('app.env') === EnvironmentTypes.DEV,
    // migrations: [__dirname + '/../../migrations/*.{ts,js}'],
    // migrationsRun: true,
    // dropSchema: true,
  }),
  inject: [ConfigService],
};
