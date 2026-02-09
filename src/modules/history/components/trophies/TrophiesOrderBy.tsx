import { useState } from 'react';
import { SectionContainer, SelectInput } from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import LinksList from '../../../../components/lists/links-list/LinksList';
import { getTrophyListItemTeam } from '../../helpers/getTrophyListItemTeam';
import { T_FETCH_TROPHIES } from '../../types';
import TrophiesOrderByCompetition from './TrophiesOrderByCompetition';
import TrophiesOrderByType from './TrophiesOrderByType';

interface Props {
  trophies?: T_FETCH_TROPHIES['trophies'];
  loading: boolean;
}

export default function TrophiesOrderBy({ trophies, loading }: Props) {
  const [order, setOrder] = useState('date');
  const options: ISelectOptions[] = [
    { label: 'Date', value: 'date' },
    { label: 'Competition', value: 'competition' },
    { label: 'Type', value: 'trophyType' },
  ];

  const onChange = (event: { target: { value: string | number } }) => {
    setOrder(event.target.value as string);
  };

  const componentToRender = () => {
    switch (order) {
      case 'competition':
        return <TrophiesOrderByCompetition trophies={trophies} />;
      case 'trophyType':
        return <TrophiesOrderByType trophies={trophies} />;
      default:
        return (
          <LinksList
            links={trophies?.map(item => getTrophyListItemTeam(item))}
            loading={loading}
            rows={15}
          />
        );
    }
  };

  return (
    <SectionContainer>
      <SelectInput
        inputName="trophiesOrder"
        label="Order by"
        onChange={onChange}
        options={options}
        errors={[]}
        defaultValue={order}
      />
      {componentToRender()}
    </SectionContainer>
  );
}
