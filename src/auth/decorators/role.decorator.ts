import { SetMetadata } from '@nestjs/common';
import { DomainRoles } from '../enums/role.enum';

type TRoles = `${DomainRoles}`;
export const Roles = (...args: TRoles[]) => SetMetadata('roles', args);
