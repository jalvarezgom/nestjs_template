import {Controller, Get, Inject, LoggerService, UseGuards,} from '@nestjs/common';
import {ExampleService} from '../services/example.service';
import {Roles} from '../../auth/decorators/role.decorator';
import {DomainRoles} from '../../auth/enums/role.enum';
import {RoleGuard} from '../../auth/guards/role.guard';
import {AccessTokenGuard} from '../../auth/guards/accessToken.guard';
import {WINSTON_MODULE_NEST_PROVIDER} from 'nest-winston/dist/winston.constants';

@Controller('app_1')
export class ExampleController {
  constructor(
    private readonly ExampleService: ExampleService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
  }

  @Get('test')
  testEndpoint() {
    this.logger.error('Registering user');
    return {message: 'test endpoint'};
  }

  @Roles(DomainRoles.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get()
  example() {
    return this.ExampleService.execute_example();
  }
}
