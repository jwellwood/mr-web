import { z } from 'zod';

export const EditProfileImageSchema = z.object({
  imageUrl: z.string().optional(),
});

export type EditProfileImageFormData = z.infer<typeof EditProfileImageSchema>;
