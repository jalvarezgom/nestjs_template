// typeorm.config.ts
import {DataSource} from 'typeorm';
import {ConfigService} from '@nestjs/config';
import {configuration} from "./configuration";
import {getCommonDatabaseConfig} from "../providers/database.provider";
import * as dotenv from "dotenv";

dotenv.config();

const configService = new ConfigService(
  configuration()
)
const dbType = configService.get('databaseConfig.dbEngine')

export default new DataSource({
  type: dbType,
  ...getCommonDatabaseConfig(configService),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
});