import { DeepOmitTypename } from '../../../../utils';
import { Add_CompetitionDocument, type Add_CompetitionMutation } from './ADD_COMPETITION.generated';
import {
  Delete_CompetitionDocument,
  type Delete_CompetitionMutation,
} from './DELETE_COMPETITION.generated';
import {
  Edit_CompetitionDocument,
  type Edit_CompetitionMutation,
} from './EDIT_COMPETITION.generated';
import {
  Fetch_CompetitionDocument,
  type Fetch_CompetitionQuery,
} from './FETCH_COMPETITION.generated';
import {
  Fetch_CompetitionsDocument,
  type Fetch_CompetitionsQuery,
} from './FETCH_COMPETITIONS.generated';

export {
  Add_CompetitionDocument as ADD_COMPETITION,
  Edit_CompetitionDocument as EDIT_COMPETITION,
  Delete_CompetitionDocument as DELETE_COMPETITION,
  Fetch_CompetitionDocument as FETCH_COMPETITION,
  Fetch_CompetitionsDocument as FETCH_COMPETITIONS,
};

export type T_FETCH_COMPETITION = DeepOmitTypename<Fetch_CompetitionQuery>;
export type T_FETCH_COMPETITIONS = DeepOmitTypename<Fetch_CompetitionsQuery>;
export type T_ADD_COMPETITION = DeepOmitTypename<Add_CompetitionMutation>;
export type T_EDIT_COMPETITION = DeepOmitTypename<Edit_CompetitionMutation>;
export type T_DELETE_COMPETITION = DeepOmitTypename<Delete_CompetitionMutation>;
