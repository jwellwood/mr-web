import { useQuery } from '@apollo/client/react';
import { DataError } from '../../../components';
import { useCustomParams } from '../../../hooks';
import { CompetitionConfig } from '../../seasons/helpers/mapOrgSeasonForm';
import LeagueTable from '../components/league-table/LeagueTable';
import { FETCH_LEAGUE_TABLES } from '../graphql';

interface Props {
  competitionConfig: CompetitionConfig;
}

export default function LeagueTableWrapper({ competitionConfig }: Props) {
  const { orgId, orgSeasonId } = useCustomParams();
  const variables = {
    orgId: orgId!,
    orgSeasonId: orgSeasonId || 'default',
    compId: competitionConfig.competitionId._id!,
  };
  const { data, error, loading } = useQuery(FETCH_LEAGUE_TABLES, { variables });

  return error ? (
    <DataError error={error} />
  ) : (
    <LeagueTable data={data} competitionConfig={competitionConfig} loading={loading} />
  );
}
