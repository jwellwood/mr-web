export const IMAGE_TYPE = {
  USER: 'user',
  TEAM: 'team',
  ORG: 'org',
} as const;

export type TImageType = (typeof IMAGE_TYPE)[keyof typeof IMAGE_TYPE];
