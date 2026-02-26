import { DeepOmitTypename } from '../../../../utils';
import {
  Fetch_League_TablesDocument,
  type Fetch_League_TablesQuery,
} from './FETCH_LEAGUE_TABLES.generated';
import {
  Update_Competition_ConfigsDocument,
  type Update_Competition_ConfigsMutation,
} from './UPDATE_COMP_CONFIGS.generated';

export {
  Update_Competition_ConfigsDocument as UPDATE_COMPETITION_CONFIGS,
  Fetch_League_TablesDocument as FETCH_LEAGUE_TABLES,
};

export type T_UPDATE_COMPETITION_CONFIGS = DeepOmitTypename<Update_Competition_ConfigsMutation>;
export type T_FETCH_LEAGUE_TABLES = DeepOmitTypename<Fetch_League_TablesQuery>;
