import React from 'react';
import { DataContainer, SectionContainer } from '../../../components/containers';
import { CustomTypography } from '../../../components/typography';
import { IListItem, IPlayerInMatch, ITempMatch } from '../../../types';
import { validateStats } from '../helpers/statsValidation';

type Props = {
  match: ITempMatch;
  players: IPlayerInMatch[];
};

const AddMatchValidation: React.FC<Props> = ({ match, players }) => {
  const { validationArray } = validateStats(match, players);
  const data: IListItem[] = [];

  const valueText = (
    value: number,
    total: number,
    isValid: boolean = false,
    isExact: boolean = false
  ) => {
    let color = '';
    if (isValid && isExact) {
      color = 'success';
    }
    if (!isValid) {
      color = 'error';
    }
    if (isValid && !isExact) {
      color = 'warning';
    }
    return (
      <CustomTypography color={color}>
        {value} / {total}
      </CustomTypography>
    );
  };

  validationArray.forEach(stat => {
    const { label, value, total, isValid, isExact } = stat;
    if (value && total) {
      data.push({ label, value: valueText(value, total, isValid, isExact) });
    }
  });

  return (
    <SectionContainer>
      <DataContainer data={data} />
    </SectionContainer>
  );
};

export default AddMatchValidation;
