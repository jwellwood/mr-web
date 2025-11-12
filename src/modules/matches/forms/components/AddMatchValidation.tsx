import { DataContainer, SectionContainer } from '../../../../components/containers';
import { IListItem } from '../../../../components/lists/types';
import { CustomTypography } from '../../../../components/typography';
import { validateStats } from '../../helpers/statsValidation';
import { IPlayerInMatch, ITempMatch } from '../../types';

type Props = {
  match: ITempMatch;
  players: IPlayerInMatch[];
};

export default function AddMatchValidation({ match, players }: Props) {
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
}
