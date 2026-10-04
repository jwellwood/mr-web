import { useQuery } from '@apollo/client/react';
import { DataError } from '../../../components';
import { useCustomParams } from '../../../hooks';
import { FETCH_ORG_SEASONS } from '../../seasons/graphql';
import { CompetitionConfig } from '../../seasons/helpers/mapOrgSeasonForm';
import ResultsAccordion from '../components/results-list/ResultsAccordion';
import { FETCH_RESULTS } from '../graphql';

interface Props {
  competitionConfig: CompetitionConfig;
  isAdminView?: boolean;
}

export default function ResultsWrapper({ competitionConfig, isAdminView }: Props) {
  const { orgId, orgSeasonId } = useCustomParams();
  const variables = {
    orgId: orgId!,
    orgSeasonId: orgSeasonId || 'default',
    competitionId: competitionConfig.competitionId._id,
  };

  const { data, error, loading } = useQuery(FETCH_RESULTS, { variables });
  const { data: seasonsData } = useQuery(FETCH_ORG_SEASONS, { variables: { orgId: orgId! } });

  const isCurrentSeason =
    !orgSeasonId ||
    orgSeasonId === 'default' ||
    !!seasonsData?.orgSeasons.find(s => s._id === orgSeasonId)?.isCurrent;

  return error ? (
    <DataError error={error} />
  ) : (
    <ResultsAccordion
      results={data?.results || []}
      loading={loading}
      isAdminView={isAdminView}
      isCurrentSeason={isCurrentSeason}
    />
  );
}
