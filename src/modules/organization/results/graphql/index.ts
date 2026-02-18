import { DeepOmitTypename } from '../../../../utils';
import { Add_ResultDocument, type Add_ResultMutation } from './ADD_RESULT.generated';
import { Delete_ResultDocument, type Delete_ResultMutation } from './DELETE_RESULT.generated';
import { Edit_ResultDocument, type Edit_ResultMutation } from './EDIT_RESULT.generated';
import { Fetch_FixturesDocument, type Fetch_FixturesQuery } from './FETCH_FIXTURES.generated';
import {
  Fetch_League_TablesDocument,
  type Fetch_League_TablesQuery,
} from './FETCH_LEAGUE_TABLES.generated';
import { Fetch_ResultDocument, type Fetch_ResultQuery } from './FETCH_RESULT.generated';
import { Fetch_ResultsDocument, type Fetch_ResultsQuery } from './FETCH_RESULTS.generated';

export {
  Add_ResultDocument as ADD_RESULT,
  Edit_ResultDocument as EDIT_RESULT,
  Delete_ResultDocument as DELETE_RESULT,
  Fetch_ResultDocument as FETCH_RESULT,
  Fetch_ResultsDocument as FETCH_RESULTS,
  Fetch_League_TablesDocument as FETCH_LEAGUE_TABLES,
  Fetch_FixturesDocument as FETCH_FIXTURES,
};

export type T_ADD_RESULT = DeepOmitTypename<Add_ResultMutation>;
export type T_EDIT_RESULT = DeepOmitTypename<Edit_ResultMutation>;
export type T_DELETE_RESULT = DeepOmitTypename<Delete_ResultMutation>;
export type T_FETCH_RESULT = DeepOmitTypename<Fetch_ResultQuery>;
export type T_FETCH_RESULTS = DeepOmitTypename<Fetch_ResultsQuery>;
export type T_FETCH_LEAGUE_TABLES = DeepOmitTypename<Fetch_League_TablesQuery>;
export type T_FETCH_FIXTURES = DeepOmitTypename<Fetch_FixturesQuery>;
