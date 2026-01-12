import { ApolloError } from '@apollo/client';

import { DataError, MatchList, NoDataText, SectionContainer } from '../../../components';
import { IMatchRecords } from '../types';

interface Props {
  data?: { stats: IMatchRecords };
  loading: boolean;
  error?: ApolloError;
}

export default function MatchRecordsView({ data, loading, error }: Props) {
  const { stats } = data || {};

  const listData = [
    { title: 'Most Goals Scored', stat: stats?.maxGoals },
    { title: 'Best Goal Difference', stat: stats?.maxDiff },
    { title: 'Most Goals Conceded', stat: stats?.maxConceded },
    { title: 'Worst Goal Difference', stat: stats?.minDiff },
  ];

  const renderContent = () => {
    return (data?.stats && !data?.stats.maxDiff) || (data?.stats && !data?.stats?.minDiff) ? (
      <NoDataText>No matches yet</NoDataText>
    ) : (
      listData.map(item => {
        return (
          <SectionContainer key={item.title} title={item.title}>
            <MatchList matches={item.stat} loading={loading} showBadge={false} showComp={false} />
          </SectionContainer>
        );
      })
    );
  };

  return error ? <DataError error={error} /> : renderContent();
}
