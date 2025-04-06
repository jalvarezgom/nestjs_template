import {DataSource} from 'typeorm';
import {Injectable} from '@nestjs/common';
import {ExampleEntity} from '../entities/example.entity';
import {GenericRepository} from '../../core/providers/repository.provider';

@Injectable()
export class ExampleRepository extends GenericRepository<ExampleEntity> {
  constructor(private dataSource: DataSource) {
    super(ExampleEntity, dataSource);
  }

  // /**
  //  * Add a basic where clause to the query and return the first result.
  //  */
  // async all(
  //   column: string,
  //   value: string | number,
  // ): Promise<Book | undefined> {
  //   return await this.all({ where: { [column]: value } });
  // }
}
