import { z } from 'zod';

const GoalscorerSchema = z.object({
  playerId: z.string().min(1),
  goals: z.number().min(1),
});

export const AddGoalscorersSchema = z.object({
  goalscorers: z.array(GoalscorerSchema).min(1),
});

export type AddGoalscorersFormData = z.infer<typeof AddGoalscorersSchema>;

export const createAddGoalscorersSchema = (teamGoals: number) =>
  AddGoalscorersSchema.superRefine((data, ctx) => {
    const total = data.goalscorers.reduce((sum, g) => sum + g.goals, 0);
    if (total > teamGoals) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Total goals cannot exceed ${teamGoals}`,
        path: ['goalscorers'],
      });
    }
  });

export const addGoalscorersInitialFormState: AddGoalscorersFormData = {
  goalscorers: [{ playerId: '', goals: 1 }],
};
