import { DeepOmitTypename } from '../../../../../utils';
import { Add_OrgDocument, type Add_OrgMutation } from './ADD_ORG.generated';
import { Delete_OrgDocument, type Delete_OrgMutation } from './DELETE_ORG.generated';
import { Edit_OrgDocument, type Edit_OrgMutation } from './EDIT_ORG.generated';
import { Edit_Org_BadgeDocument, type Edit_Org_BadgeMutation } from './EDIT_ORG_BADGE.generated';

export {
  Add_OrgDocument as ADD_ORG,
  Edit_OrgDocument as EDIT_ORG,
  Edit_Org_BadgeDocument as EDIT_ORG_BADGE,
  Delete_OrgDocument as DELETE_ORG,
};

export type T_ADD_ORG = DeepOmitTypename<Add_OrgMutation>;
export type T_EDIT_ORG = DeepOmitTypename<Edit_OrgMutation>;
export type T_EDIT_ORG_BADGE = DeepOmitTypename<Edit_Org_BadgeMutation>;
export type T_DELETE_ORG = DeepOmitTypename<Delete_OrgMutation>;
