import { useTranslation } from 'react-i18next';
import { DataError, MatchList, NoDataText, SectionContainer } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import MatchesStreaks from '../../containers/MatchesStreaks';
import { T_FETCH_MATCHES_RECORDS } from '../../graphql';
import { mapMatchRecordsMatchesToMatchesList } from './mappers';

interface Props {
  data?: T_FETCH_MATCHES_RECORDS;
  loading: boolean;
  error?: TApolloError;
}

export default function MatchRecordsView({ data, loading, error }: Props) {
  const { t } = useTranslation('matches');
  const { stats } = data || {};

  const listData = [
    { title: t('RECORDS.MOST_GOALS_SCORED'), stat: stats?.maxGoals || [] },
    { title: t('RECORDS.BEST_GOAL_DIFFERENCE'), stat: stats?.maxDiff || [] },
    { title: t('RECORDS.MOST_GOALS_CONCEDED'), stat: stats?.maxConceded || [] },
    { title: t('RECORDS.WORST_GOAL_DIFFERENCE'), stat: stats?.minDiff || [] },
  ];

  const renderContent = () => {
    return (data?.stats && !data?.stats.maxDiff) || (data?.stats && !data?.stats?.minDiff) ? (
      <NoDataText>{t('MESSAGES.NO_MATCHES')}</NoDataText>
    ) : (
      <>
        {listData.map(item => {
          return (
            <SectionContainer key={item.title} title={item.title}>
              <MatchList
                matches={mapMatchRecordsMatchesToMatchesList(item.stat || [])}
                loading={loading}
                showBadge={false}
                showComp={false}
              />
            </SectionContainer>
          );
        })}
        <SectionContainer title={t('SECTIONS.STREAKS')}>
          <MatchesStreaks />
        </SectionContainer>
      </>
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
