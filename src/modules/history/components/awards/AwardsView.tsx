import { ApolloError } from '@apollo/client';

import AwardList from './AwardList';
import { DataError, NoDataText } from '../../../../components';
import { T_FETCH_AWARDS } from '../../types';

interface Props {
  data?: T_FETCH_AWARDS;
  loading: boolean;
  error?: ApolloError;
  seasonId?: string;
}

export default function AwardsView({ data, loading, error, seasonId }: Props) {
  const renderContent = () => {
    return data?.awards && data.awards.length === 0 ? (
      <NoDataText>No awards yet</NoDataText>
    ) : (
      <AwardList awards={data?.awards} loading={loading} seasonId={seasonId} />
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
