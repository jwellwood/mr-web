import { z } from 'zod';
import { getRequiredFields } from '../../../../utils';
import { TTiebreaker } from '../../constants';

const CompConfigTeamSchema = z.object({
  teamId: z.string().min(1),
  startingPoints: z.number().optional(),
});

export const UpdateCompConfigSchema = z.object({
  rounds: z.coerce.number().optional(),
  splitIndexes: z.array(z.number()).optional(),
  relegationPositions: z.array(z.number()).optional(),
  promotionPositions: z.array(z.number()).optional(),
  priority: z.coerce.number().optional(),
  tiebreaker: z.enum([
    TTiebreaker.HEAD_TO_HEAD,
    TTiebreaker.GOAL_DIFFERENCE,
    TTiebreaker.PENALTIES,
  ]),
  teams: z.array(CompConfigTeamSchema).optional(),
});

export const requiredFields = getRequiredFields(UpdateCompConfigSchema);

export type UpdateCompConfigFormInput = z.input<typeof UpdateCompConfigSchema>;
export type UpdateCompConfigFormData = z.output<typeof UpdateCompConfigSchema>;
