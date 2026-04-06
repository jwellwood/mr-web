import { useTranslation } from 'react-i18next';
import { parseDate } from '../../../utils';
import CustomSkeleton from '../../loaders/custom-skeleton/CustomSkeleton';
import { CustomTypography } from '../../typography';
import { IMatchesListMatch } from '../types';

interface Props {
  match: IMatchesListMatch;
  loading?: boolean;
  showComp?: boolean;
}

export default function MatchListLabel({ match, loading, showComp = true }: Props) {
  const { t } = useTranslation('components');
  const { date, isHome, opponentName, competition, isForfeit } = match || {};

  const homeOrAway = (
    <CustomTypography size="xs" bold color={isHome ? 'primary' : 'label'}>
      {isHome ? t('MATCH_TABLES.HOME') : t('MATCH_TABLES.AWAY')}
      {'  '}
    </CustomTypography>
  );

  const forfeit = (
    <CustomTypography size="xs" bold color="error">
      {' '}
      {isForfeit ? t('MATCH_TABLES.FORFEIT') : ''}
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
          {showComp ? `${parseDate(date)}, ${competition}` : parseDate(date)}
        </CustomTypography>
      </>
    </>
  );
}
