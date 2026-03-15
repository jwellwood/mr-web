import { DeepOmitTypename } from '../../../utils';
import { Fetch_FixturesDocument, type Fetch_FixturesQuery } from './FETCH_FIXTURES.generated';
import {
  Fetch_League_TablesDocument,
  type Fetch_League_TablesQuery,
} from './FETCH_LEAGUE_TABLES.generated';
import { Fetch_OrgDocument, type Fetch_OrgQuery } from './FETCH_ORG.generated';
import { Fetch_Org_SeasonDocument, type Fetch_Org_SeasonQuery } from './FETCH_ORG_SEASON.generated';
import {
  Fetch_Org_SeasonsDocument,
  type Fetch_Org_SeasonsQuery,
} from './FETCH_ORG_SEASONS.generated';
import { Fetch_Org_TeamsDocument, type Fetch_Org_TeamsQuery } from './FETCH_ORG_TEAMS.generated';
import { Fetch_ResultDocument, type Fetch_ResultQuery } from './FETCH_RESULT.generated';
import { Fetch_ResultsDocument, type Fetch_ResultsQuery } from './FETCH_RESULTS.generated';

export {
  Fetch_Org_SeasonDocument as FETCH_ORG_SEASON,
  Fetch_Org_SeasonsDocument as FETCH_ORG_SEASONS,
  Fetch_League_TablesDocument as FETCH_LEAGUE_TABLES,
  Fetch_OrgDocument as FETCH_ORG,
  Fetch_Org_TeamsDocument as FETCH_ORG_TEAMS,
  Fetch_ResultDocument as FETCH_RESULT,
  Fetch_ResultsDocument as FETCH_RESULTS,
  Fetch_FixturesDocument as FETCH_FIXTURES,
};

export type T_FETCH_ORG_SEASON = DeepOmitTypename<Fetch_Org_SeasonQuery>;
export type T_FETCH_ORG_SEASONS = DeepOmitTypename<Fetch_Org_SeasonsQuery>;
export type T_FETCH_LEAGUE_TABLES = DeepOmitTypename<Fetch_League_TablesQuery>;
export type T_FETCH_ORG = DeepOmitTypename<Fetch_OrgQuery>;
export type T_FETCH_ORG_TEAMS = DeepOmitTypename<Fetch_Org_TeamsQuery>;
export type T_FETCH_RESULT = DeepOmitTypename<Fetch_ResultQuery>;
export type T_FETCH_RESULTS = DeepOmitTypename<Fetch_ResultsQuery>;
export type T_FETCH_FIXTURES = DeepOmitTypename<Fetch_FixturesQuery>;
