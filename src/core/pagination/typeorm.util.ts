import {ILike, In, IsNull, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, Not,} from 'typeorm';
import {Filtering} from './filter.decorator';
import {Sorting} from './sorting.decorator';
import {FilterRule} from './pagination.enum';

export const getOrder = (sort: Sorting) =>
  sort ? {[sort.property]: sort.direction} : {};

export const getWhere = (filters: Filtering[]) => {
  if (!filters) return {};
  const where = {};

  filters.forEach((filter) => {
    Object.assign(where, getFilter(filter));
  });

  return where;
};

export const getFilter = (filter: Filtering) => {
  if (!filter) return {};

  if (filter.rule == FilterRule.IS_NULL) return {[filter.property]: IsNull()};
  if (filter.rule == FilterRule.IS_NOT_NULL)
    return {[filter.property]: Not(IsNull())};
  if (filter.rule == FilterRule.EQUALS)
    return {[filter.property]: filter.value};
  if (filter.rule == FilterRule.NOT_EQUALS)
    return {[filter.property]: Not(filter.value)};
  if (filter.rule == FilterRule.GREATER_THAN)
    return {[filter.property]: MoreThan(filter.value)};
  if (filter.rule == FilterRule.GREATER_THAN_OR_EQUALS)
    return {[filter.property]: MoreThanOrEqual(filter.value)};
  if (filter.rule == FilterRule.LESS_THAN)
    return {[filter.property]: LessThan(filter.value)};
  if (filter.rule == FilterRule.LESS_THAN_OR_EQUALS)
    return {[filter.property]: LessThanOrEqual(filter.value)};
  if (filter.rule == FilterRule.LIKE)
    return {[filter.property]: ILike(`%${filter.value}%`)};
  if (filter.rule == FilterRule.NOT_LIKE)
    return {[filter.property]: Not(ILike(`%${filter.value}%`))};
  if (filter.rule == FilterRule.IN)
    return {[filter.property]: In(filter.value.split(','))};
  if (filter.rule == FilterRule.NOT_IN)
    return {[filter.property]: Not(In(filter.value.split(',')))};
};
