import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';
import { SortOrder } from './pagination.enum';
import { TransformUtil } from '../utils/transform.util';

export class PaginationFilter {
  @Transform(({ value }) =>
    TransformUtil.toNumber(value, { default: 1, min: 1 }),
  )
  @IsNumber({}, { message: ' "page" atrribute should be a number' })
  public page: number;

  @Transform(({ value }) =>
    TransformUtil.toNumber(value, { default: 10, min: 1 }),
  )
  @IsNumber({}, { message: ' "pageSize" attribute should be a number ' })
  public pageSize: number;

  @IsOptional()
  public orderBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
}
