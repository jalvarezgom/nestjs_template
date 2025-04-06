import {BadRequestException, createParamDecorator, ExecutionContext,} from '@nestjs/common';
import {Request} from 'express';
import {TransformUtil} from '../utils/transform.util';

export interface Pagination {
  page: number;
  limit: number;
  size: number;
  offset: number;
}

const MAXPAGESIZE = 100;
export const PaginationParams = createParamDecorator(
  (data, ctx: ExecutionContext): Pagination => {
    const req: Request = ctx.switchToHttp().getRequest();
    const page = TransformUtil.toNumber(req.query.page, {default: 1, min: 1}); //parseInt(req.query.page as string);
    const size = TransformUtil.toNumber(req.query.size, {
      default: 10,
      min: 1,
    }); //parseInt(req.query.size as string);

    // check if page and size are valid
    if (isNaN(page)) {
      throw new BadRequestException(
        'Invalid pagination params: page should be a number',
      );
    }
    if (isNaN(size)) {
      throw new BadRequestException(
        'Invalid pagination params: size should be a number',
      );
    }

    // do not allow to fetch large slices of the dataset
    if (size > MAXPAGESIZE) {
      throw new BadRequestException(
        `Invalid pagination params: Max size is ${MAXPAGESIZE}`,
      );
    }

    // calculate pagination parameters
    const limit = size;
    const offset = (page - 1) * limit;
    return {page, limit, size, offset};
  },
);
