import React from 'react';
import { useQuery } from '@apollo/client';
import { SectionContainer } from 'components/containers';
import LinksList from 'components/lists/LinksList';
import { CustomTypography } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import { theme } from 'theme';
import { GET_MATCH_STATS_MOST } from '../graphql/matchStats.graphql';
import { mostMatchListData } from '../helpers/mostMatchListData';

const MatchRecords: React.FC = () => {
  const { orgId, teamId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_MATCH_STATS_MOST, {
    variables: { teamId },
  });

  const { stats } = data || {};

  if (error) {
    return <ErrorGraphql error={[error]} />;
  }

  const listData = [
    { title: 'Most Goals Scored', stat: stats?.maxGoals },
    { title: 'Best Goal Difference', stat: stats?.maxDiff },
    { title: 'Most Goals Conceded', stat: stats?.maxConceded },
    { title: 'Worst Goal Difference', stat: stats?.minDiff },
  ];

  return (
    <SectionContainer>
      {(data?.stats && !data?.stats.maxDiff) ||
      (data?.stats && !data?.stats?.minDiff) ? (
        <CustomTypography color="warning">No matches yet</CustomTypography>
      ) : (
        listData.map((item) => {
          return (
            <SectionContainer
              key={item.title}
              background={theme.palette.dark.main}
            >
              <CustomTypography color="label" bold size="xs">
                {item.title}
              </CustomTypography>
              <LinksList
                links={mostMatchListData(item.stat, orgId, teamId, loading)}
              />
            </SectionContainer>
          );
        })
      )}
    </SectionContainer>
  );
};

export default MatchRecords;
