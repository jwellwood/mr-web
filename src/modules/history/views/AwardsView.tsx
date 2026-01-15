import { ApolloError } from '@apollo/client';

import { IAward } from '../types';
import AwardList from '../components/AwardList';
import { DataError, NoDataText } from '../../../components';

type Props = {
  data?: { awards: IAward[] };
  loading: boolean;
  error?: ApolloError;
  seasonId?: string;
};

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
