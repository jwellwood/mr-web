import { z } from 'zod';

export function getRequiredFields<T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
): Record<keyof T, boolean> {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, field]) => [
      key,
      !((field as z.ZodTypeAny) instanceof z.ZodOptional),
    ])
  ) as Record<keyof T, boolean>;
}
