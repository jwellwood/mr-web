import { DataError } from '../../../../components';
import ItemDetails from '../../../../components/common/history/item-details/ItemDetails';
import { TApolloError } from '../../../../types/apollo';
import { T_FETCH_AWARD } from '../../types';

interface Props {
  data?: T_FETCH_AWARD;
  loading: boolean;
  error?: TApolloError;
}

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
      comment={comment || ''}
      commentValue={awardValue || ''}
      loading={loading}
    />
  );

  return error ? <DataError error={error} /> : renderContent();
}
