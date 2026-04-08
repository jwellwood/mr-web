import { useTranslation } from 'react-i18next';
import { SectionContainer } from '../../../components';
import { TextList, type IListItem } from '../../../components/lists';
import { ITrophyTotals } from '../types';

interface Props {
  data?: ITrophyTotals;
  loading: boolean;
}

export default function TrophiesTotals({ data, loading }: Props) {
  const { t } = useTranslation('trophies');
  const listData: IListItem[] = [
    { label: t('TOTALS.TOTAL'), value: data?.total },
    { label: t('TOTALS.WINS'), value: data?.winner },
    { label: t('TOTALS.FINALS'), value: data?.final },
  ] as const;
  return (
    <SectionContainer title={t('TOTALS.TITLE')}>
      <TextList data={listData} loading={loading} />
    </SectionContainer>
  );
}
