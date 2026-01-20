import { z } from 'zod';

export const SearchFormSchema = z.object({
  teamName: z.string().min(2, 'Team name must be at least 2 characters'),
});

export type SearchFormData = z.infer<typeof SearchFormSchema>;
