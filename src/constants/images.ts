export const IMAGE_TYPE = {
  USER: 'user',
  BADGE: 'badge',
} as const;

export type TImageType = (typeof IMAGE_TYPE)[keyof typeof IMAGE_TYPE];
