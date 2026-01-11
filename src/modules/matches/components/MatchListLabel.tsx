import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { parseDate } from '../../../utils/helpers';
import { IMatchList } from '../types';

type Props = {
  match: IMatchList;
  loading?: boolean;
};

export default function MatchListLabel({ match, loading }: Props) {
  const { date, isHome, opponentName, competition, isForfeit } = match || {};

  const homeOrAway = (
    <CustomTypography size="xs" bold color={isHome ? 'primary' : 'label'}>
      {isHome ? '(H)' : '(A)'}
      {'  '}
    </CustomTypography>
  );

  const forfeit = (
    <CustomTypography size="xs" bold color="error">
      {' '}
      {isForfeit ? 'F' : ''}
      {'  '}
    </CustomTypography>
  );

  return loading ? (
    <CustomSkeleton width="175px" height="42px" margin="0" />
  ) : (
    <>
      <div>
        {homeOrAway} {forfeit}
        <CustomTypography color="data" bold>
          {opponentName}
        </CustomTypography>
      </div>

      <>
        <CustomTypography size="xs" color="label">
          {parseDate(date)}, {competition}
        </CustomTypography>
      </>
    </>
  );
}
