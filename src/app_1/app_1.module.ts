import { Logger, Module } from '@nestjs/common';
import { ExampleRepository } from './repositories/example.repository';
import { CoreModule } from '../core/core.module';
import { ExampleController } from './controllers/example.controller';
import { ExampleService } from './services/example.service';

@Module({
  imports: [CoreModule],
  controllers: [ExampleController],
  providers: [ExampleRepository, ExampleService, Logger],
})
export class App_1Module {}
