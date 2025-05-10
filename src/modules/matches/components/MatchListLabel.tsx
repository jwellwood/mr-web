import React from 'react';
import CustomSkeleton from '../../../components/loaders/CustomSkeleton';
import { CustomTypography } from '../../../components/typography';
import { IMatchList } from 'types/IMatchList';
import { parseDate } from 'utils/helpers';

type Props = {
  match: IMatchList;
  loading: boolean;
};

const MatchListLabel: React.FC<Props> = ({ match, loading }) => {
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
};

export default MatchListLabel;
