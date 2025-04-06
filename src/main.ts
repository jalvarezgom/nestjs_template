import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {Logger, ValidationPipe} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {EnvironmentConfigService} from './core/config/environment';
import {getDatabaseProviderType} from './core/providers/database.provider';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  EnvironmentConfigService.validateEnvironmentConfig();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS API')
    .setDescription('The API for NestJS')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  const port = configService.get('server.port');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port ?? 3000);
  Logger.log(`Application ${configService.get('app.name')}`);
  Logger.log(`\tEnvironment ${configService.get('app.env')}`);
  Logger.log(`\tDatabase configuration ${getDatabaseProviderType()}`);
  Logger.log(`\tServer running on port ${port} 🪄`);
}

bootstrap();
