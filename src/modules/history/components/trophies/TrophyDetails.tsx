import { CustomTypography } from '../../../../components';
import { HistoryItemDetails } from '../../../../components/composed';
import { T_FETCH_TROPHY } from '../../types';

interface Props {
  trophy?: T_FETCH_TROPHY['trophy'];
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
    <HistoryItemDetails
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
