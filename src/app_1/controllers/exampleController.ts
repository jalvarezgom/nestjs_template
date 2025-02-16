import { Controller, Get, UseGuards } from '@nestjs/common';
import { ExampleService } from '../services/example.service';
import { Roles } from '../../auth/decorators/role.decorator';
import { DomainRoles } from '../../auth/enums/role.enum';
import { RoleGuard } from '../../auth/guards/role.guard';
import { AccessTokenGuard } from '../../auth/guards/accessToken.guard';

@Controller('app_1')
export class ExampleController {
  constructor(private readonly ExampleService: ExampleService) {}

  @Get()
  testEndpoint() {
    return { message: 'test endpoint' };
  }

  @Roles(DomainRoles.ADMIN)
  @UseGuards(AccessTokenGuard, RoleGuard)
  @Get()
  example() {
    return this.ExampleService.execute_example();
  }
}
