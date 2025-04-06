import {UseInterceptors} from '@nestjs/common';
import {SerializationInterceptor} from './serialization.interceptor';
import {ClassConstructor} from 'class-transformer';

export function Serialize(classConstructor: ClassConstructor<unknown>) {
  return UseInterceptors(new SerializationInterceptor(classConstructor));
}
