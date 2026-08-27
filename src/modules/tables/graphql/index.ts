import { DeepOmitTypename } from '../../../utils';
import {
  Fetch_League_TablesDocument,
  type Fetch_League_TablesQuery,
} from '../../tables/graphql/FETCH_LEAGUE_TABLES.generated';

export { Fetch_League_TablesDocument as FETCH_LEAGUE_TABLES };

export type T_FETCH_LEAGUE_TABLES = DeepOmitTypename<Fetch_League_TablesQuery>;
