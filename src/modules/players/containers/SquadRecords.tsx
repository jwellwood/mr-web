import React from 'react';
import { useQuery } from '@apollo/client';
import { SectionContainer } from 'components/containers';
import { Spinner } from 'components/loaders';
import { CustomTypography } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useCustomParams } from 'hooks/useCustomParams';
import RecordsTable from '../components/RecordsTable';
import { GET_TOP_PLAYER_STATS } from '../graphql';
import MostInMatchStats from './MostInMatchStats';

const SquadRecords: React.FC = () => {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(GET_TOP_PLAYER_STATS, {
    variables: { teamId },
  });

  const dataToDisplay = [
    { label: 'Most Apps', value: 'apps' },
    { label: 'Most Goals', value: 'goals' },
    { label: 'Most Assists', value: 'assists' },
    { label: 'Most MVPs', value: 'mvp' },
  ];

  if (error) {
    return <ErrorGraphql error={[error]} />;
  }

  return (
    <SectionContainer>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {data?.stats?.apps.length === 0 ? (
            <CustomTypography color="warning">No players yet</CustomTypography>
          ) : (
            <>
              {dataToDisplay.map((item) => {
                return (
                  <RecordsTable
                    key={item.label}
                    label={item.label}
                    stat={item.value}
                    value={data?.stats}
                  />
                );
              })}
              <MostInMatchStats />
            </>
          )}
        </>
      )}
    </SectionContainer>
  );
};

export default SquadRecords;
