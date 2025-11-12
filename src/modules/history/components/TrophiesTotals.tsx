import { DataContainer, SectionContainer } from '../../../components/containers';
import { IListItem } from '../../../components/lists/types';
import { ITrophyTotals } from '../types';

type Props = {
  data?: ITrophyTotals;
  loading: boolean;
};

export default function TrophiesTotals({ data, loading }: Props) {
  const listData: IListItem[] = [
    { label: 'Total', value: data?.total },
    { label: 'Wins', value: data?.winner },
    { label: 'Finals', value: data?.final },
  ] as const;
  return (
    <SectionContainer>
      <DataContainer data={listData} loading={loading} />
    </SectionContainer>
  );
}
