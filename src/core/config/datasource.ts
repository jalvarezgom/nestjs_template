// typeorm.config.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { configuration } from './configuration';
import { getCommonDatabaseConfig } from '../providers/database.provider';
import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import chalk from 'chalk';

const env_filepath = '.env.migrations';
console.log(
  chalk.blue.bold(`🚀 Loading environment variables from: ${env_filepath}`),
);
if (!existsSync(env_filepath)) {
  throw new Error(
    chalk.red.bold(`❌ Environment file not found: ${env_filepath}`),
  );
}
dotenv.config({
  path: env_filepath,
});

const configService = new ConfigService(configuration());
const dbType = configService.get('databaseConfig.dbEngine');

export default new DataSource({
  type: dbType,
  ...getCommonDatabaseConfig(configService),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.js,.ts}'],
});
