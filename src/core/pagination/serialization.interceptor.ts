import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ClassConstructor, plainToInstance } from 'class-transformer';

@Injectable()
export class SerializationInterceptor implements NestInterceptor {
  constructor(private classConstructor: ClassConstructor<unknown>) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const groups = user?.roles ?? [];

    return next.handle().pipe(map((data) => this.serialize(data, groups)));
  }

  private serialize(value: unknown, groups?: string[]): unknown {
    return plainToInstance(this.classConstructor, value, {
      groups,
    });
  }
}
