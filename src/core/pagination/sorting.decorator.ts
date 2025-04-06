import {BadRequestException, createParamDecorator, ExecutionContext,} from '@nestjs/common';
import {Request} from 'express';

export interface Sorting {
  property: string;
  direction: string;
}

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export const SortingParams = createParamDecorator(
  (validParams, ctx: ExecutionContext): Sorting => {
    const req: Request = ctx.switchToHttp().getRequest();
    const property = req.query.orderBy as string;
    const direction = (req.query.sort as string) || SortOrder.ASC;
    if (!property) return null;

    // check if the valid params sent is an array
    if (typeof validParams != 'object')
      throw new BadRequestException('Invalid sort parameter');

    // check the format of the sort query param
    const orderByPattern = /^([a-zA-Z0-9]+)$/;
    if (!property.match(orderByPattern))
      throw new BadRequestException('Invalid sort parameter');
    const sortPattern = /^(asc|desc)$/i;
    if (!direction.match(sortPattern))
      throw new BadRequestException('Invalid sort parameter');

    // check if the property is valid
    if (!validParams.includes(property))
      throw new BadRequestException(`Invalid sort property: ${property}`);

    return {property, direction};
  },
);
