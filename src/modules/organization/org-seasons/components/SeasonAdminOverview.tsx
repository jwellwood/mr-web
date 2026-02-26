import { DataError, SectionContainer } from '../../../../components';
import { TextList } from '../../../../components/lists';
import { Spinner } from '../../../../components/loaders';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_ORG_SEASON } from '../graphql';

interface Props {
  season?: T_FETCH_ORG_SEASON['orgSeason'];
  loading?: boolean;
  error?: TApolloError;
}

export default function SeasonAdminView({ season, loading, error }: Props) {
  const listItems = [
    {
      label: 'Name',
      value: season?.name || '-',
    },
    {
      label: 'Start Date',
      value: season?.yearStarted || '-',
    },
    {
      label: 'End Date',
      value: season?.yearEnded || '-',
    },
    {
      label: 'Current Season',
      value: season?.isCurrent ? 'Yes' : 'No',
    },
    {
      label: 'Number of Teams',
      value: season?.teamIds.length ?? '-',
    },
    {
      label: 'Number of Competitions',
      value: season?.competitionConfigs?.length ?? '-',
    },
  ];

  return loading ? (
    <Spinner />
  ) : (
    <SectionContainer>
      {error ? <DataError error={error} /> : <TextList data={listItems} />}
    </SectionContainer>
  );
}
