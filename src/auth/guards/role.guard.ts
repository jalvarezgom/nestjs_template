import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  matchRoles(validRoles: string[], userRole: string) {
    return validRoles.some((role) => userRole === role);
  }

  canActivate(context: ExecutionContext): boolean {
    const validRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!validRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRoles(validRoles, user.role);
  }
}
