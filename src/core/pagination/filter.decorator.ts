import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { Request } from 'express';
import { FilterRule } from './pagination.enum';

export interface Filtering {
  property: string;
  rule: string;
  value: string;
}

export class FilterParams {
  fields: string[];
  validLookups?: FilterRule[] = [
    FilterRule.EQUALS,
    FilterRule.NOT_EQUALS,
    FilterRule.GREATER_THAN,
    FilterRule.GREATER_THAN_OR_EQUALS,
    FilterRule.LESS_THAN,
    FilterRule.LESS_THAN_OR_EQUALS,
    FilterRule.LIKE,
    FilterRule.NOT_LIKE,
    FilterRule.IN,
    FilterRule.NOT_IN,
    FilterRule.IS_NULL,
    FilterRule.IS_NOT_NULL,
  ];
  separator?: string = '__';

  constructor(
    fields: string[],
    validLookups?: FilterRule[],
    separator?: string,
  ) {
    this.fields = fields;
    if (validLookups) this.validLookups = validLookups;
    if (separator) this.separator = separator;
  }
}

export const FilteringParams = createParamDecorator(
  (params: FilterParams, ctx: ExecutionContext): Filtering[] => {
    // check if the valid params sent is an array
    if (typeof params.fields != 'object')
      throw new BadRequestException('Invalid filter parameter');
    params = new FilterParams(
      params.fields,
      params.validLookups,
      params.separator,
    );

    const req: Request = ctx.switchToHttp().getRequest();
    const fields: string[] = Object.keys(req.query).filter((key) =>
      key.match(params.separator),
    );
    if (fields.length == 0) return null;

    const filters: Filtering[] = [];
    const filterRegexField = `^[a-zA-Z0-9_]+${params.separator}(eq|neq|gte|gt|lte|lt|like|nlike|in|nin)$`;
    const filterRegexIsNull = `^[a-zA-Z0-9_]+${params.separator}(isnull|isnotnull)$`;
    fields.forEach((field) => {
      // validate the format of the filter, if the rule is 'isnull' or 'isnotnull' it don't need to have a value
      if (!field.match(filterRegexField) && !field.match(filterRegexIsNull)) {
        throw new BadRequestException('Invalid filter parameter');
      }

      // extract the parameters and validate if the rule and the property are valid
      const [property, rule] = field.split('__');
      if (!params.fields.includes(property))
        throw new BadRequestException(`Invalid filter property: ${property}`);
      if (!Object.values(FilterRule).includes(rule as FilterRule))
        throw new BadRequestException(`Invalid filter rule: ${rule}`);
      filters.push({ property, rule, value: req.query[field] as string });
    });

    return filters;
  },
);
