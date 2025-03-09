export const TransformUtil = {
  toNumber(value: any, options: { default: number; min: number }) {
    if (value === undefined) {
      return options.default;
    }
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? NaN : Math.max(parsed, options.min);
  },
};
