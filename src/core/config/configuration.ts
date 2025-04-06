import {EnvironmentTypes} from '../enums/environment.enum';

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
      dbEngine: process.env.DB_ENGINE as string,
      dbHost: process.env.DB_HOST as string,
      dbPort: +process.env.DB_PORT,
      dbName: process.env.DB_NAME as string,
      username: process.env.DB_USERNAME as string,
      password: process.env.DB_PASSWORD as string,
      debug: process.env.DB_DEBUG === 'true',
    },
  };
};
