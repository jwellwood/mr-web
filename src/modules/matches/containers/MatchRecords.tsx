import { useQuery } from '@apollo/client';

import { FETCH_MATCHES_RECORDS } from '../graphql';
import { SectionContainer } from '../../../components/containers';
import LinksList from '../../../components/lists/LinksList';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { mostMatchListData } from '../helpers/mostMatchListData';

export default function MatchRecords() {
  const { orgId, teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_MATCHES_RECORDS, {
    variables: { teamId },
  });

  const { stats } = data || {};

  const listData = [
    { title: 'Most Goals Scored', stat: stats?.maxGoals },
    { title: 'Best Goal Difference', stat: stats?.maxDiff },
    { title: 'Most Goals Conceded', stat: stats?.maxConceded },
    { title: 'Worst Goal Difference', stat: stats?.minDiff },
  ];

  const renderContent = () => {
    return (data?.stats && !data?.stats.maxDiff) || (data?.stats && !data?.stats?.minDiff) ? (
      <CustomTypography color="warning">No matches yet</CustomTypography>
    ) : (
      listData.map(item => {
        return (
          <SectionContainer key={item.title}>
            <CustomTypography color="label" bold size="xs">
              {item.title}
            </CustomTypography>
            <LinksList links={mostMatchListData(item.stat || [], orgId, teamId, loading)} />
          </SectionContainer>
        );
      })
    );
  };

  return (
    <SectionContainer>{error ? <ErrorGraphql error={error} /> : renderContent()}</SectionContainer>
  );
}
