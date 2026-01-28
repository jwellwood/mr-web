import { SectionContainer } from '../../../../components';
import TextList from '../../../../components/lists/TextList';
import { IListItem } from '../../../../components/lists/types';
import { ITrophyTotals } from '../../types';

interface Props {
  data?: ITrophyTotals;
  loading: boolean;
}

export default function TrophiesTotals({ data, loading }: Props) {
  const listData: IListItem[] = [
    { label: 'Total', value: data?.total },
    { label: 'Wins', value: data?.winner },
    { label: 'Finals', value: data?.final },
  ] as const;
  return (
    <SectionContainer title="Totals">
      <TextList data={listData} loading={loading} />
    </SectionContainer>
  );
}
