import { DeepOmitTypename } from '../../../utils';
import { Add_GoalscorersDocument, type Add_GoalscorersMutation } from './ADD_GOALSCORERS.generated';
import { Add_ResultDocument, type Add_ResultMutation } from './ADD_RESULT.generated';
import {
  Batch_Confirm_ResultsDocument,
  type Batch_Confirm_ResultsMutation,
} from './BATCH_CONFIRM_RESULTS.generated';
import { Delete_ResultDocument, type Delete_ResultMutation } from './DELETE_RESULT.generated';
import {
  Edit_GoalscorersDocument,
  type Edit_GoalscorersMutation,
} from './EDIT_GOALSCORERS.generated';
import { Edit_ResultDocument, type Edit_ResultMutation } from './EDIT_RESULT.generated';
import { Fetch_FixturesDocument, type Fetch_FixturesQuery } from './FETCH_FIXTURES.generated';
import {
  Fetch_Goalscorer_LeaderboardDocument,
  type Fetch_Goalscorer_LeaderboardQuery,
} from './FETCH_GOALSCORER_LEADERBOARD.generated';
import {
  Fetch_League_TablesDocument,
  type Fetch_League_TablesQuery,
} from './FETCH_LEAGUE_TABLES.generated';
import {
  Fetch_Players_By_TeamDocument,
  type Fetch_Players_By_TeamQuery,
} from './FETCH_PLAYERS_FOR_RESULT_INPUT.generated';
import { Fetch_ResultDocument, type Fetch_ResultQuery } from './FETCH_RESULT.generated';
import { Fetch_ResultsDocument, type Fetch_ResultsQuery } from './FETCH_RESULTS.generated';

export {
  Fetch_League_TablesDocument as FETCH_LEAGUE_TABLES,
  Fetch_ResultDocument as FETCH_RESULT,
  Fetch_ResultsDocument as FETCH_RESULTS,
  Fetch_FixturesDocument as FETCH_FIXTURES,
  Add_ResultDocument as ADD_RESULT,
  Edit_ResultDocument as EDIT_RESULT,
  Delete_ResultDocument as DELETE_RESULT,
  Add_GoalscorersDocument as ADD_GOALSCORERS,
  Edit_GoalscorersDocument as EDIT_GOALSCORERS,
  Batch_Confirm_ResultsDocument as BATCH_CONFIRM_RESULTS,
  Fetch_Players_By_TeamDocument as FETCH_PLAYERS_BY_TEAM,
  Fetch_Goalscorer_LeaderboardDocument as FETCH_GOALSCORER_LEADERBOARD,
};

export type T_FETCH_LEAGUE_TABLES = DeepOmitTypename<Fetch_League_TablesQuery>;
export type T_FETCH_RESULT = DeepOmitTypename<Fetch_ResultQuery>;
export type T_FETCH_RESULTS = DeepOmitTypename<Fetch_ResultsQuery>;
export type T_FETCH_FIXTURES = DeepOmitTypename<Fetch_FixturesQuery>;
export type T_ADD_RESULT = DeepOmitTypename<Add_ResultMutation>;
export type T_EDIT_RESULT = DeepOmitTypename<Edit_ResultMutation>;
export type T_DELETE_RESULT = DeepOmitTypename<Delete_ResultMutation>;
export type T_ADD_GOALSCORERS = DeepOmitTypename<Add_GoalscorersMutation>;
export type T_EDIT_GOALSCORERS = DeepOmitTypename<Edit_GoalscorersMutation>;
export type T_BATCH_CONFIRM_RESULTS = DeepOmitTypename<Batch_Confirm_ResultsMutation>;
export type T_FETCH_PLAYERS_BY_TEAM = DeepOmitTypename<Fetch_Players_By_TeamQuery>;
export type T_FETCH_GOALSCORER_LEADERBOARD = DeepOmitTypename<Fetch_Goalscorer_LeaderboardQuery>;
