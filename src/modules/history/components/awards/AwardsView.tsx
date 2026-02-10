import { DataError, NoDataText } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_AWARDS } from '../../types';
import AwardList from './AwardList';

interface Props {
  data?: T_FETCH_AWARDS;
  loading: boolean;
  error?: TApolloError;
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
