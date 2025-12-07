export class EnvironmentConfigService {
  private static requiredEnvVars = [
    //Application
    'APP_NAME',
    'APP_ENV',
    // Server
    'SERVER_PORT',
    // Token
    'JWT_ACCESS_SECRET',
    'JWT_ACCESS_SECRET_EXPIRATION_TIME',
    'JWT_REFRESH_SECRET',
    'JWT_REFRESH_SECRET_EXPIRATION_TIME',
    // Database configuration
    'DB__HOST',
    'DB__USERNAME',
    'DB__PASSWORD',
    'DB__NAME',
    // Cache configuration
    'CACHE__PROVIDER',
    'CACHE__TTL',
  ];

  static validateEnvironmentConfig() {
    if (process.env.NODE_ENV === undefined) {
      process.env.NODE_ENV = 'development';
    }

    this.requiredEnvVars.forEach((v) => {
      if (!process.env[v])
        throw Error(`[ConfigService] Missing required env variable ${v}`);
    });
  }
}
