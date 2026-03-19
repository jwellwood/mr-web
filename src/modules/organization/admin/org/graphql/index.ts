import { DeepOmitTypename } from '../../../../../utils';
import { Add_OrgDocument, type Add_OrgMutation } from './ADD_ORG.generated';
import { Delete_OrgDocument, type Delete_OrgMutation } from './DELETE_ORG.generated';
import { Edit_OrgDocument, type Edit_OrgMutation } from './EDIT_ORG.generated';
import { Edit_Org_BadgeDocument, type Edit_Org_BadgeMutation } from './EDIT_ORG_BADGE.generated';
import {
  Fetch_Org_Admin_ViewDocument,
  type Fetch_Org_Admin_ViewQuery,
} from './FETCH_ORG_ADMIN.generated';
import {
  Set_Org_Admin_Access_CodeDocument,
  type Set_Org_Admin_Access_CodeMutation,
} from './SET_ORG_ADMIN_ACCESS_CODE.generated';
import {
  Toggle_Org_Admin_AccessDocument,
  type Toggle_Org_Admin_AccessMutation,
} from './TOGGLE_ORG_ADMIN_ACCESS.generated';

export {
  Add_OrgDocument as ADD_ORG,
  Edit_OrgDocument as EDIT_ORG,
  Edit_Org_BadgeDocument as EDIT_ORG_BADGE,
  Delete_OrgDocument as DELETE_ORG,
  Fetch_Org_Admin_ViewDocument as FETCH_ORG_ADMIN_VIEW,
  Set_Org_Admin_Access_CodeDocument as SET_ORG_ADMIN_ACCESS_CODE,
  Toggle_Org_Admin_AccessDocument as TOGGLE_ORG_ADMIN_ACCESS,
};

export type T_ADD_ORG = DeepOmitTypename<Add_OrgMutation>;
export type T_EDIT_ORG = DeepOmitTypename<Edit_OrgMutation>;
export type T_EDIT_ORG_BADGE = DeepOmitTypename<Edit_Org_BadgeMutation>;
export type T_DELETE_ORG = DeepOmitTypename<Delete_OrgMutation>;
export type T_SET_ORG_ADMIN_ACCESS_CODE = DeepOmitTypename<Set_Org_Admin_Access_CodeMutation>;
export type T_FETCH_ORG_ADMIN_VIEW = DeepOmitTypename<Fetch_Org_Admin_ViewQuery>;
export type T_TOGGLE_ORG_ADMIN_ACCESS = DeepOmitTypename<Toggle_Org_Admin_AccessMutation>;
