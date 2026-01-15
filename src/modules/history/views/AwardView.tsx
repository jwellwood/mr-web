import { ApolloError } from '@apollo/client';

import { IAward } from '../types';
import { DataError } from '../../../components';
import ItemDetails from '../../../components/common/history/item-details/ItemDetails';

type Props = {
  data?: { award: IAward };
  loading: boolean;
  error?: ApolloError;
};

export default function AwardView({ data, loading, error }: Props) {
  const { winners, comment, awardName, awardValue } = data?.award || {};

  const renderContent = () => (
    <ItemDetails
      icon="trophy"
      iconColor="gold"
      header={awardName || ''}
      subHeader={
        winners?.map(winner => (typeof winner === 'string' ? winner : winner.name)).join(', ') || ''
      }
      comment={comment}
      commentValue={awardValue}
      loading={loading}
    />
  );

  return error ? <DataError error={error} /> : renderContent();
}
