import { DeepOmitTypename } from '../../../utils';
import {
  type Fetch_Orgs_By_SearchQuery,
  Fetch_Orgs_By_SearchDocument,
} from './FETCH_ORGS_BY_SEARCH.generated';
import {
  type Fetch_Teams_By_SearchQuery,
  Fetch_Teams_By_SearchDocument,
} from './FETCH_TEAMS_BY_SEARCH.generated';

export {
  Fetch_Teams_By_SearchDocument as FETCH_TEAMS_BY_SEARCH,
  Fetch_Orgs_By_SearchDocument as FETCH_ORGS_BY_SEARCH,
};

export type T_FETCH_TEAMS_BY_SEARCH = DeepOmitTypename<Fetch_Teams_By_SearchQuery>;
export type T_FETCH_ORGS_BY_SEARCH = DeepOmitTypename<Fetch_Orgs_By_SearchQuery>;
