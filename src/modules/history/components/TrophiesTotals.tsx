import React from 'react';
import { DataContainer, SectionContainer } from 'components/containers';
import { IListItem, ITrophyTotals } from 'types';

type Props = {
  data: ITrophyTotals;
  loading: boolean;
};

const TrophiesTotals: React.FC<Props> = ({ data, loading }) => {
  const listData: IListItem[] = [
    { label: 'Total', value: data?.total },
    { label: 'Wins', value: data?.winner },
    { label: 'Finals', value: data?.final },
  ];
  return (
    <SectionContainer>
      <DataContainer data={listData} loading={loading} />
    </SectionContainer>
  );
};

export default TrophiesTotals;
