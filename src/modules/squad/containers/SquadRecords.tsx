import { useQuery } from '@apollo/client';

import { FETCH_SQUAD_RECORDS } from '../graphql';
import { SectionContainer } from '../../../components/containers';
import { Spinner } from '../../../components/loaders';
import { CustomTypography } from '../../../components/typography';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import { useCustomParams } from '../../../hooks/useCustomParams';
import RecordsTable from '../components/RecordsTable';
import MostInMatchStats from './SquadRecordsInMatches';

export default function SquadRecords() {
  const { teamId } = useCustomParams();
  const { data, loading, error } = useQuery(FETCH_SQUAD_RECORDS, {
    variables: { teamId },
  });

  const dataToDisplay = [
    { label: 'Most Apps', value: 'apps' },
    { label: 'Most Goals', value: 'goals' },
    { label: 'Most Assists', value: 'assists' },
    { label: 'Most MVPs', value: 'mvp' },
  ] as const;

  const renderContent = () => {
    return loading ? (
      <Spinner />
    ) : data?.stats ? (
      <>
        {data?.stats?.apps.length === 0 ? (
          <CustomTypography color="warning">No players yet</CustomTypography>
        ) : (
          <>
            {dataToDisplay.map(item => {
              return (
                <RecordsTable
                  key={item.label}
                  label={item.label}
                  stat={item.value}
                  value={data.stats}
                />
              );
            })}
            <MostInMatchStats />
          </>
        )}
      </>
    ) : null;
  };

  return (
    <SectionContainer>{error ? <ErrorGraphql error={error} /> : renderContent()}</SectionContainer>
  );
}
