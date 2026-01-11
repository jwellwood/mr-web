import { ApolloError } from '@apollo/client';

import { IAward } from '../types';
import AwardList from '../components/AwardList';
import { DataError, NoDataText } from '../../../components';

type Props = {
  data?: { awards: IAward[] };
  loading: boolean;
  error?: ApolloError;
};

export default function AwardsView({ data, loading, error }: Props) {
  const renderContent = () => {
    return data?.awards && data.awards.length === 0 ? (
      <NoDataText>No awards yet</NoDataText>
    ) : (
      <AwardList awards={data?.awards} loading={loading} />
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
