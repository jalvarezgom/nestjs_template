import { EnvironmentTypes } from '../enums/environment.enum';

const DEFAULT_SERVER_PORT = 3000;

interface Configuration {
  app: {
    name: string;
    env: string;
  };
  server: {
    port: number;
  };
  token: {
    accessSecret: string;
    accessSecretExpirationTime: string;
    refreshSecret: string;
    refreshSecretExpirationTime: string;
  };
  databaseConfig: {
    dbEngine: string;
    dbHost: string;
    dbPort: number;
    dbName: string;
    username: string;
    password: string;
    debug: boolean;
  };
  cache: {
    provider: string;
    ttl: number;
    redisUrl?: string;
  };
}

export const getEnvironmentFileNameByEnvVariable = () => {
  return process.env.APP_ENV === EnvironmentTypes.TEST ? '.env.test' : '.env';
};

export const configuration = (): Configuration => {
  return {
    app: {
      name: process.env.APP_NAME as string,
      env: process.env.APP_ENV as string,
    },
    server: {
      port:
        parseInt(process.env.SERVER_PORT as string, 10) || DEFAULT_SERVER_PORT,
    },
    token: {
      accessSecret: process.env.JWT_ACCESS_SECRET as string,
      accessSecretExpirationTime: process.env
        .JWT_ACCESS_SECRET_EXPIRATION_TIME as string,
      refreshSecret: process.env.JWT_REFRESH_SECRET as string,
      refreshSecretExpirationTime: process.env
        .JWT_REFRESH_SECRET_EXPIRATION_TIME as string,
    },
    databaseConfig: {
      dbEngine: process.env.DB__ENGINE as string,
      dbHost: process.env.DB__HOST as string,
      dbPort: +process.env.DB__PORT,
      dbName: process.env.DB__NAME as string,
      username: process.env.DB__USERNAME as string,
      password: process.env.DB__PASSWORD as string,
      debug: process.env.DB__DEBUG === 'true',
    },
    cache: {
      provider: process.env.CACHE__PROVIDER as string,
      ttl: +process.env.CACHE__TTL,
      redisUrl: process.env.CACHE__REDIS_URL,
    },
  };
};
