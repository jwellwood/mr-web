import { useTranslation } from 'react-i18next';
import { NoDataText } from '../../../components';
import { CustomStack } from '../../../components/grids';
import { IListItem, TextList } from '../../../components/lists';
import { T_FETCH_RESULT } from '../graphql';

interface Props {
  result: T_FETCH_RESULT['result'];
}

export default function ResultGoalscorers({ result }: Props) {
  const { t } = useTranslation('results');
  const { homeGoalscorers, awayGoalscorers, homeGoals, awayGoals } = result;
  const isGoalless = !homeGoals && !awayGoals;
  const homeTeamGoalscorers: IListItem[] =
    homeGoalscorers?.map(scorer => ({
      label: scorer?.playerId?.name || '-',
      value: scorer?.goals,
    })) || [];

  const awayTeamGoalscorers: IListItem[] =
    awayGoalscorers?.map(scorer => ({
      label: scorer?.playerId?.name || '-',
      value: scorer?.goals,
    })) || [];

  if (homeTeamGoalscorers.length === 0 && awayTeamGoalscorers.length === 0 && !isGoalless) {
    return <NoDataText>{t('MESSAGES.NO_GOALSCORERS')}</NoDataText>;
  }

  return !isGoalless ? (
    <CustomStack direction="row" divider={true} align="flex-start">
      <div style={{ width: '100%' }}>
        <TextList data={homeTeamGoalscorers || []} />
      </div>
      <div style={{ width: '100%' }}>
        <TextList data={awayTeamGoalscorers || []} />
      </div>
    </CustomStack>
  ) : null;
}
