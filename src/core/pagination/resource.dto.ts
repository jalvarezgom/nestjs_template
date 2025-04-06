import {ClassConstructor, Type} from 'class-transformer';

export type PaginatedResource<T> = {
  totalItems: number;
  items: T[];
  page: number;
  size: number;
};

export function PaginationSerializerDto<T>(dataDto: ClassConstructor<T>) {
  class DecoratedPaginationDto {
    totalItems: number;
    @Type(() => dataDto)
    items: Array<typeof dataDto>;
    page: number;
    size: number;
  }

  return DecoratedPaginationDto;
}
