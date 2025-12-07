export enum EnvironmentTypes {
  DEV = 'DEV',
  TEST = 'TEST',
  PROD = 'PROD',
}

export enum DatabaseProviderType {
  DEV = 'databaseDevProvider',
  TEST = 'databaseTestProvider',
  PROD = 'databaseProdProvider',
}

export enum LoggerProviderType {
  DEV = 'loggerDevProvider',
  PROD = 'loggerProdProvider',
}

export enum CacheProviderType {
  MEMORY = 'MEMORY',
  REDIS = 'REDIS',
}
