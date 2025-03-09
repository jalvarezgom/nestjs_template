import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'node:process';
import {
  EnvironmentTypes,
  LoggerProviderType,
} from '../enums/environment.enum';
import { WinstonModuleAsyncOptions } from 'nest-winston';
import * as winston from 'winston';
import * as path from 'node:path';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export const getLoggerProviderType = (): LoggerProviderType => {
  switch (process.env.APP_ENV as EnvironmentTypes) {
    case EnvironmentTypes.DEV:
      return LoggerProviderType.DEV;
    case EnvironmentTypes.TEST:
      return LoggerProviderType.DEV;
    case EnvironmentTypes.PROD:
      return LoggerProviderType.PROD;
    default:
      throw new Error(`Option ${process.env.APP_ENV} not supported`);
  }
};

export const getLoggerProvider = () => {
  const providerType = getLoggerProviderType();
  if (providerType === LoggerProviderType.PROD) return loggerProdProvider;
  return loggerDevProvider;
};

const customFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `${timestamp} ${level}: ${message}`;
});

const loggerDevProvider: WinstonModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: () => ({
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.simple(),
          customFormat,
        ),
      }),
    ],
  }),
  inject: [ConfigService],
};

const loggerProdProvider: WinstonModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: () => ({
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.simple(),
          customFormat,
        ),
      }),
      new DailyRotateFile({
        dirname: path.join(__dirname, './../../../share/log/'), // path to where save logging result
        filename: 'api-%DATE%.log', // name of file where will be saved logging result
        datePattern: 'YYYY-MM-DD',
        level: 'info',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '7d',
        format: winston.format.combine(
          winston.format.timestamp(),
          customFormat,
        ),
      }),
    ],
  }),
  inject: [ConfigService],
};
