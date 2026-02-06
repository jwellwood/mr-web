import { ApolloError } from '@apollo/client';

import { DataError, MatchList, NoDataText, SectionContainer } from '../../../../components';
import { T_FETCH_MATCHES_RECORDS } from '../../types';
import { mapMatchRecordsMatchesToMatchesList } from './mappers';
import MatchesStreaks from '../../containers/MatchesStreaks';

interface Props {
  data?: T_FETCH_MATCHES_RECORDS;
  loading: boolean;
  error?: ApolloError;
}

export default function MatchRecordsView({ data, loading, error }: Props) {
  const { stats } = data || {};

  const listData = [
    { title: 'Most Goals Scored', stat: stats?.maxGoals || [] },
    { title: 'Best Goal Difference', stat: stats?.maxDiff || [] },
    { title: 'Most Goals Conceded', stat: stats?.maxConceded || [] },
    { title: 'Worst Goal Difference', stat: stats?.minDiff || [] },
  ];

  const renderContent = () => {
    return (data?.stats && !data?.stats.maxDiff) || (data?.stats && !data?.stats?.minDiff) ? (
      <NoDataText>No matches yet</NoDataText>
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
        <SectionContainer title="Streaks">
          <MatchesStreaks />
        </SectionContainer>
      </>
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
