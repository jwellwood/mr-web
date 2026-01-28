import { z } from 'zod';

export const AwardSchema = z.object({
  awardName: z
    .string()
    .min(1, 'Award name is required')
    .max(50, 'Award name must be at most 50 characters'),
  winners: z.array(z.string()),
  awardValue: z.union([z.string(), z.number()]).optional(),
  comment: z.string().optional(),
});

export type AwardFormData = z.infer<typeof AwardSchema>;
