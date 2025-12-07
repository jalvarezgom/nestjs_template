import { Logger, Module } from '@nestjs/common';
import { ExampleCommand } from './tasks/example.task';

@Module({
  providers: [ExampleCommand, Logger],
})
export class CliModule {}
