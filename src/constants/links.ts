export const LINK_TYPE = {
  ADD: 'add',
  EDIT: 'edit',
} as const;

export type TLinkType = (typeof LINK_TYPE)[keyof typeof LINK_TYPE];
