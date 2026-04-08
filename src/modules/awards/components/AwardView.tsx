import { HistoryItemDetails } from '../../../components/composed';
import { T_FETCH_AWARD } from '../graphql';

interface Props {
  data?: T_FETCH_AWARD;
  loading: boolean;
}

export default function AwardView({ data, loading }: Props) {
  const { winners, comment, awardName, awardValue } = data?.award || {};

  return (
    <HistoryItemDetails
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
}
