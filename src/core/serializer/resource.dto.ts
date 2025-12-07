import { ExposeOptions } from 'class-transformer/types/interfaces';

export type Constructor<T = {}> = new (...args: any[]) => T; // eslint-disable-line @typescript-eslint/no-empty-object-type

export interface SerializerFields<
  T extends abstract new (...args: any) => any,
> {
  field: keyof InstanceType<T>;
  options?: ExposeOptions;
}
