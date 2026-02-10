import { z } from 'zod';

export function zodDate(): z.ZodDate;
export function zodDate(optional: true): z.ZodOptional<z.ZodDate>;
export function zodDate(optional = false) {
  const preprocessFn = (arg: unknown) => {
    if (arg instanceof Date) return arg;
    if (typeof arg === 'string' || typeof arg === 'number') {
      const d = new Date(arg as never);
      return isNaN(d.getTime()) ? (optional ? undefined : arg) : d;
    }
    return optional ? undefined : arg;
  };

  const schema = optional
    ? z.preprocess(preprocessFn, z.date().optional())
    : z.preprocess(preprocessFn, z.date());
  return schema as never;
}

export default zodDate;
