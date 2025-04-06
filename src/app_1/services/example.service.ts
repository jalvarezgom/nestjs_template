import { Injectable } from '@nestjs/common';
import { ExampleEntity } from '../entities/example.entity';
import { ExampleRepository } from '../repositories/example.repository';
import { PaginationService } from '../../core/pagination-simple/pagination.service';
import { PaginationFilter } from '../../core/pagination-simple/pagination.filter';
import { ExampleFilter } from '../interfaces/example.filter';
import { ILike } from 'typeorm';
import { Pagination } from '../../core/pagination/pagination.decorator';
import { Sorting } from '../../core/pagination/sorting.decorator';
import { Filtering } from '../../core/pagination/filter.decorator';
import { PaginatedResource } from '../../core/pagination/resource.dto';
import { getOrder, getWhere } from '../../core/pagination/typeorm.util';

@Injectable()
export class ExampleService extends PaginationService {
  constructor(private exampleRepository: ExampleRepository) {
    super();
  }

  async findFirst(): Promise<ExampleEntity> {
    return this.exampleRepository.findOne({ where: { id: 1 } });
  }

  async findAll(): Promise<ExampleEntity[]> {
    return this.exampleRepository.find();
  }

  async findAllPaginatedSimple(filter: PaginationFilter & ExampleFilter) {
    const { ...params } = filter;
    return await this.paginate(
      this.exampleRepository,
      filter,
      this.createWhereQuery(params),
    );
  }

  private createWhereQuery(params: ExampleFilter) {
    const where: any = {};

    if (params.name) {
      where.name = ILike(`%${params.name}%`);
    }

    return where;
  }

  async findAllPaginatedFilter(
    { page, limit, size, offset }: Pagination,
    sort?: Sorting,
    filters?: Filtering[],
  ): Promise<PaginatedResource<Partial<ExampleEntity>>> {
    const where = getWhere(filters);
    const order = getOrder(sort);

    const [items, total] = await this.exampleRepository.findAndCount({
      where,
      order,
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      items: items,
      page,
      size,
    };
  }

  async execute_example(): Promise<ExampleEntity> {
    return {
      id: 1,
      name: 'Example entity',
      description: 'This is an example entity',
      price: 100,
    };
  }

  async save(data: ExampleEntity): Promise<ExampleEntity> {
    return await this.exampleRepository.save(data);
  }
}
