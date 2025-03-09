import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  LoggerService,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ExampleService } from '../services/example.service';
import { Roles } from '../../auth/decorators/role.decorator';
import { DomainRoles } from '../../auth/enums/role.enum';
import { RoleGuard } from '../../auth/guards/role.guard';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston/dist/winston.constants';
import { ExampleEntity } from '../entities/example.entity';
import { PaginationFilter } from '../../core/pagination-simple/pagination.filter';
import {
  Filtering,
  FilteringParams,
} from '../../core/pagination/filter.decorator';
import {
  Pagination,
  PaginationParams,
} from '../../core/pagination/pagination.decorator';
import {
  Sorting,
  SortingParams,
} from '../../core/pagination/sorting.decorator';
import { PaginatedResource } from '../../core/pagination/resource.dto';

@Controller('app_1')
export class ExampleController {
  constructor(
    private readonly ExampleService: ExampleService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  @Post('create-data')
  createData() {
    this.logger.log('Creating data...');
    let seed = new ExampleEntity();
    seed.name = '1';
    seed.description = 'This is an example entity';
    seed.price = 100;
    this.ExampleService.save(seed).then();
    seed = new ExampleEntity();
    seed.name = '2';
    seed.description = 'This is an example entity';
    seed.price = 100;
    this.ExampleService.save(seed).then();

    return { message: 'Data created' };
  }

  @Get('find-all')
  findAll() {
    this.logger.log('Finding all data');
    return this.ExampleService.findAll();
  }

  @Get('find-all-paginated-simple')
  @UseInterceptors(ClassSerializerInterceptor)
  findAllPaginatedSimple(@Query() pagination: PaginationFilter) {
    this.logger.log('Finding all data paginated');
    return this.ExampleService.findAllPaginatedSimple(pagination);
  }

  @Get('find-all-paginated-filter')
  @UseInterceptors(ClassSerializerInterceptor)
  findAllPaginatedFilter(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'id']) sort?: Sorting,
    @FilteringParams({ fields: ['name', 'id'] }) filters?: Filtering[],
  ): Promise<PaginatedResource<Partial<ExampleEntity>>> {
    this.logger.log('Finding all data paginated');
    return this.ExampleService.findAllPaginatedFilter(
      paginationParams,
      sort,
      filters,
    );
  }

  @Get('test')
  testEndpoint() {
    this.logger.error('Registering user');
    return { message: 'test endpoint' };
  }

  @Roles(DomainRoles.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get()
  example() {
    return this.ExampleService.execute_example();
  }
}
