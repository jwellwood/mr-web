import { DeepOmitTypename } from '../../../utils';
import {
  Add_GoalscorersDocument,
  type Add_GoalscorersMutation,
} from '../../goalscorers/graphql/__generated__/ADD_GOALSCORERS.generated';
import {
  Edit_GoalscorersDocument,
  type Edit_GoalscorersMutation,
} from './__generated__/EDIT_GOALSCORERS.generated';
import {
  Fetch_Goalscorer_LeaderboardDocument,
  type Fetch_Goalscorer_LeaderboardQuery,
} from './__generated__/FETCH_GOALSCORER_LEADERBOARD.generated';
import {
  Fetch_Players_By_TeamDocument,
  type Fetch_Players_By_TeamQuery,
} from './__generated__/FETCH_PLAYERS_FOR_RESULT_INPUT.generated';

export {
  Fetch_Goalscorer_LeaderboardDocument as FETCH_GOALSCORER_LEADERBOARD,
  Add_GoalscorersDocument as ADD_GOALSCORERS,
  Edit_GoalscorersDocument as EDIT_GOALSCORERS,
  Fetch_Players_By_TeamDocument as FETCH_PLAYERS_BY_TEAM,
};

export type T_FETCH_GOALSCORER_LEADERBOARD = DeepOmitTypename<Fetch_Goalscorer_LeaderboardQuery>;
export type T_ADD_GOALSCORERS = DeepOmitTypename<Add_GoalscorersMutation>;
export type T_EDIT_GOALSCORERS = DeepOmitTypename<Edit_GoalscorersMutation>;
export type T_FETCH_PLAYERS_BY_TEAM = DeepOmitTypename<Fetch_Players_By_TeamQuery>;
