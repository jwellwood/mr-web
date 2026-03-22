import { z } from 'zod';
import { zodDate } from '../../../../utils';

export const BatchResultSchema = z.object({
  date: zodDate(),
  gameWeek: z.preprocess(
    v => (v === '' || v === undefined ? undefined : Number(v)),
    z.number().int().min(1, 'Game Week is required')
  ),
  competitionId: z.string().min(1, 'Competition is required'),
  orgSeasonId: z.string().optional(),
  matches: z
    .array(
      z.object({
        homeTeam: z.string().min(1, 'Home team is required'),
        awayTeam: z.string().min(1, 'Away team is required'),
        homeGoals: z.union([z.string(), z.number()]).optional(),
        awayGoals: z.union([z.string(), z.number()]).optional(),
        isForfeit: z.boolean().optional(),
        isComplete: z.boolean().optional(),
      })
    )
    .min(1, 'At least one match is required')
    .superRefine((matches, ctx) => {
      // ensure home and away are different for each match
      matches.forEach((m, i) => {
        if (m.homeTeam && m.awayTeam && m.homeTeam === m.awayTeam) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Home and away must be different',
            path: ['matches', i, 'awayTeam'],
          });
        }
      });

      // ensure no team is used more than once across all matches
      const occurrences: Record<string, number[]> = {};
      matches.forEach((m, i) => {
        if (m.homeTeam) occurrences[m.homeTeam] = (occurrences[m.homeTeam] || []).concat(i);
        if (m.awayTeam) occurrences[m.awayTeam] = (occurrences[m.awayTeam] || []).concat(i);
      });

      Object.entries(occurrences).forEach(([teamId, idxs]) => {
        if (teamId && idxs.length > 1) {
          idxs.forEach(i => {
            const field = matches[i].homeTeam === teamId ? 'homeTeam' : 'awayTeam';
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Team already used in another match',
              path: ['matches', i, field],
            });
          });
        }
      });
    }),
});

export type BatchResultFormData = z.infer<typeof BatchResultSchema>;
