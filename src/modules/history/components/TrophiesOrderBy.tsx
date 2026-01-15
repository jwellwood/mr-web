import { useState } from 'react';

import { SelectInput } from '../../../components/inputs';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import { ITrophyResponse } from '../types';
import LinksList from '../../../components/lists/links-list/LinksList';
import { getTrophyListItemTeam } from '../helpers/getTrophyListItemTeam';
import TrophiesOrderByCompetition from './TrophiesOrderByCompetition';
import TrophiesOrderByType from './TrophiesOrderByType';
import { SectionContainer } from '../../../components';

type Props = {
  trophies?: ITrophyResponse[];
  loading: boolean;
};

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
