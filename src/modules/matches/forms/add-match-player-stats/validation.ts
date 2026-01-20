import { z } from 'zod';

export const AddMatchPlayerStatsSchema = z.object({
  name: z.string().min(1),
  isStarter: z.boolean(),
  position: z.string().optional(),
  matchPosition: z.string().min(1),
  goals: z.number().int().min(0),
  pensScored: z.number().int().min(0),
  assists: z.number().int().min(0),
  ownGoals: z.number().int().min(0),
  pensMissed: z.number().int().min(0),
  pensSaved: z.number().int().min(0),
  conceded: z.number().int().min(0),
  yellowCards: z.number().int().min(0),
  mvp: z.boolean(),
  redCard: z.boolean(),
  cleanSheet: z.boolean(),
});

export type AddMatchPlayerStatsFormValues = z.infer<typeof AddMatchPlayerStatsSchema>;

export default AddMatchPlayerStatsSchema;
