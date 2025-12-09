import { NoDataText } from '../../../components';
import { IRecords } from '../types';
import RecordsTable from './RecordsTable';
import MostInMatchStats from '../containers/SquadRecordsInMatches';
import { Spinner } from '../../../components/loaders';

type Props = {
  data?: IRecords;
  loading: boolean;
};

export default function Records({ data, loading }: Props) {
  const dataToDisplay = [
    { label: 'Most Apps', value: 'apps' },
    { label: 'Most Goals', value: 'goals' },
    { label: 'Most Assists', value: 'assists' },
    { label: 'Most MVPs', value: 'mvp' },
  ] as const;

  const renderData = () =>
    data && data.apps.length === 0 ? (
      <NoDataText>No records yet</NoDataText>
    ) : (
      <>
        {dataToDisplay.map(item => {
          return (
            <RecordsTable
              key={item.label}
              label={item.label}
              stat={item.value}
              value={data || {}}
            />
          );
        })}
        <MostInMatchStats />
      </>
    );

  const renderContent = () => {
    return loading ? <Spinner /> : renderData();
  };

  return renderContent();
}
