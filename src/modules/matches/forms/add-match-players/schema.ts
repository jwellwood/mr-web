import { z } from 'zod';

export const AddMatchPlayersSchema = z.object({
  matchPlayers: z.array(z.string()),
});

export type AddMatchPlayersFormValues = z.infer<typeof AddMatchPlayersSchema>;

export default AddMatchPlayersSchema;
