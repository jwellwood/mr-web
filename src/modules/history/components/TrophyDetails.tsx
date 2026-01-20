import ItemDetails from '../../../components/common/history/item-details/ItemDetails';
import { ITrophyResponse } from '../types';
import { CustomTypography } from '../../../components';

interface Props {
  trophy?: ITrophyResponse;
  loading: boolean;
}

export default function TrophyDetails({ trophy, loading }: Props) {
  const { name, isFinal, isWinner, season, opponent, comment } = trophy || {};

  const commentValue = isFinal ? (
    <div>
      vs{' '}
      {
        <CustomTypography color="data" bold>
          {opponent}
        </CustomTypography>
      }
    </div>
  ) : null;

  return (
    <ItemDetails
      icon={isWinner ? 'trophy' : 'medal'}
      iconColor={isWinner ? 'gold' : 'silver'}
      header={name || ''}
      subHeader={season || ''}
      comment={comment || ''}
      commentValue={commentValue || ''}
      loading={loading}
    />
  );
}
