export const LINK_TYPE = {
  ADD: 'add',
  EDIT: 'edit',
  DELETE: 'delete',
} as const;

export type TLinkType = (typeof LINK_TYPE)[keyof typeof LINK_TYPE];
