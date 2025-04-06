import {PaginationFilter} from './pagination.filter';
import {FindOptionsWhere, Repository} from 'typeorm';

export class PaginationService {
  protected createOrderQuery(filter: PaginationFilter) {
    const order: any = {};

    if (filter.orderBy) {
      order[filter.orderBy] = filter.sortOrder;
      return order;
    }
    return order;
  }

  protected paginate<T>(
    repository: Repository<T>,
    filter: PaginationFilter,
    where: FindOptionsWhere<T>,
  ) {
    return repository.findAndCount({
      order: this.createOrderQuery(filter),
      skip: (filter.page - 1) * (filter.pageSize + 1),
      take: filter.pageSize,
      where: where,
    });
  }
}
