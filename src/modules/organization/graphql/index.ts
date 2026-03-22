import { DeepOmitTypename } from '../../../utils';
import { Fetch_OrgDocument, type Fetch_OrgQuery } from './FETCH_ORG.generated';
import { Fetch_Org_SeasonDocument, type Fetch_Org_SeasonQuery } from './FETCH_ORG_SEASON.generated';
import {
  Fetch_Org_SeasonsDocument,
  type Fetch_Org_SeasonsQuery,
} from './FETCH_ORG_SEASONS.generated';
import { Fetch_Org_TeamsDocument, type Fetch_Org_TeamsQuery } from './FETCH_ORG_TEAMS.generated';
import {
  Request_Org_Admin_AccessDocument,
  type Request_Org_Admin_AccessMutation,
} from './REQUEST_ORG_ADMIN_ACCESS.generated';

export {
  Fetch_Org_SeasonDocument as FETCH_ORG_SEASON,
  Fetch_Org_SeasonsDocument as FETCH_ORG_SEASONS,
  Fetch_OrgDocument as FETCH_ORG,
  Fetch_Org_TeamsDocument as FETCH_ORG_TEAMS,
  Request_Org_Admin_AccessDocument as REQUEST_ORG_ADMIN_ACCESS,
};

export type T_FETCH_ORG_SEASON = DeepOmitTypename<Fetch_Org_SeasonQuery>;
export type T_FETCH_ORG_SEASONS = DeepOmitTypename<Fetch_Org_SeasonsQuery>;
export type T_FETCH_ORG = DeepOmitTypename<Fetch_OrgQuery>;
export type T_FETCH_ORG_TEAMS = DeepOmitTypename<Fetch_Org_TeamsQuery>;
export type T_REQUEST_ORG_ADMIN_ACCESS = DeepOmitTypename<Request_Org_Admin_AccessMutation>;
