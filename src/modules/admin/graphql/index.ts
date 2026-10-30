import { DeepOmitTypename } from '../../../utils';
import {
  Fetch_Org_Admin_ViewDocument,
  type Fetch_Org_Admin_ViewQuery,
} from './FETCH_ORG_ADMIN.generated';
import {
  Fetch_Team_Admin_ViewDocument,
  type Fetch_Team_Admin_ViewQuery,
} from './FETCH_TEAM_ADMIN_VIEW.generated';
import {
  Request_Org_Admin_AccessDocument,
  type Request_Org_Admin_AccessMutation,
} from './REQUEST_ORG_ADMIN_ACCESS.generated';
import {
  Request_Team_Admin_AccessDocument,
  type Request_Team_Admin_AccessMutation,
} from './REQUEST_TEAM_ADMIN_ACCESS.generated';
import {
  Set_Org_Admin_Access_CodeDocument,
  type Set_Org_Admin_Access_CodeMutation,
} from './SET_ORG_ADMIN_ACCESS_CODE.generated';
import {
  Set_Team_Admin_Access_CodeDocument,
  type Set_Team_Admin_Access_CodeMutation,
} from './SET_TEAM_ADMIN_ACCESS_CODE.generated';
import {
  Toggle_Org_Admin_AccessDocument,
  type Toggle_Org_Admin_AccessMutation,
} from './TOGGLE_ORG_ADMIN_ACCESS.generated';

export {
  Fetch_Team_Admin_ViewDocument as FETCH_TEAM_ADMIN_VIEW,
  Request_Team_Admin_AccessDocument as REQUEST_TEAM_ADMIN_ACCESS,
  Set_Org_Admin_Access_CodeDocument as SET_ORG_ADMIN_ACCESS_CODE,
  Toggle_Org_Admin_AccessDocument as TOGGLE_ORG_ADMIN_ACCESS,
  Request_Org_Admin_AccessDocument as REQUEST_ORG_ADMIN_ACCESS,
  Set_Team_Admin_Access_CodeDocument as SET_TEAM_ADMIN_ACCESS_CODE,
  Fetch_Org_Admin_ViewDocument as FETCH_ORG_ADMIN_VIEW,
};
// export types
export type T_FETCH_TEAM_ADMIN_VIEW = DeepOmitTypename<Fetch_Team_Admin_ViewQuery>;
export type T_REQUEST_TEAM_ADMIN_ACCESS = DeepOmitTypename<Request_Team_Admin_AccessMutation>;
export type T_REQUEST_ORG_ADMIN_ACCESS = DeepOmitTypename<Request_Org_Admin_AccessMutation>;
export type T_SET_ORG_ADMIN_ACCESS_CODE = DeepOmitTypename<Set_Org_Admin_Access_CodeMutation>;
export type T_TOGGLE_ORG_ADMIN_ACCESS = DeepOmitTypename<Toggle_Org_Admin_AccessMutation>;
export type T_SET_TEAM_ADMIN_ACCESS_CODE = DeepOmitTypename<Set_Team_Admin_Access_CodeMutation>;
export type T_FETCH_ORG_ADMIN_VIEW = DeepOmitTypename<Fetch_Org_Admin_ViewQuery>;
