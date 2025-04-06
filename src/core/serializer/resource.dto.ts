import {ExposeOptions} from "class-transformer/types/interfaces";

export type Constructor<T = {}> = new (...args: any[]) => T;

export interface SerializerFields<T extends abstract new (...args: any) => any> {
  field: keyof InstanceType<T>
  options?: ExposeOptions
}