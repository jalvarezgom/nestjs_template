import { Injectable } from '@nestjs/common';
import { ExampleEntity } from '../entities/example.entity';
import { ExampleRepository } from '../repositories/example.repository';

@Injectable()
export class ExampleService {
  constructor(private exampleRepository: ExampleRepository) {}

  async execute_example(): Promise<ExampleEntity> {
    return { id: 1, name: 'Example entity' };
  }
}
