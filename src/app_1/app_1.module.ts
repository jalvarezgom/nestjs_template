import { Module } from '@nestjs/common';
import { ExampleRepository } from './repositories/example.repository';
import { CoreModule } from '../core/core.module';
import { ExampleController } from './controllers/exampleController';
import { ExampleService } from './services/example.service';

@Module({
  imports: [CoreModule],
  controllers: [ExampleController],
  providers: [ExampleRepository, ExampleService],
})
export class App_1Module {}
