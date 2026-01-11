import { ApolloError } from '@apollo/client';

import { IRecords } from '../types';
import { DataError, SectionContainer, NoDataText } from '../../../components';
import SquadRecordTable from '../components/squad-record-table/SquadRecordTable';
import SquadMostGoalsInMatch from '../containers/SquadMostGoalsInMatch';
import SquadMostAssistsInMatch from '../containers/SquadMostAssistsInMatch';

type Props = {
  loading: boolean;
  error?: ApolloError;
  data?: { stats: IRecords };
};

export default function RecordsView({ data, loading, error }: Props) {
  const dataToDisplay = [
    { label: 'Most Apps', value: 'apps' },
    { label: 'Most Goals', value: 'goals' },
    { label: 'Most Assists', value: 'assists' },
    { label: 'Most MVPs', value: 'mvp' },
  ] as const;

  const renderContent = () => (
    <>
      {data && data.stats?.apps.length === 0 ? (
        <NoDataText>No records yet</NoDataText>
      ) : (
        <>
          {dataToDisplay.map(item => {
            return (
              <SectionContainer key={item.label} title={item.label}>
                <SquadRecordTable data={data?.stats || {}} loading={loading} stat={item.value} />
              </SectionContainer>
            );
          })}
          <SquadMostGoalsInMatch />
          <SquadMostAssistsInMatch />
        </>
      )}
    </>
  );

  return error ? <DataError error={error} /> : renderContent();
}
