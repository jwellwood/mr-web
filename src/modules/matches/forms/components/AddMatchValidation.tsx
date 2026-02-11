import { SectionContainer } from '../../../../components';
import { TextList, type IListItem } from '../../../../components/lists';
import { CustomTypography } from '../../../../components/typography';
import { validateStats } from '../../helpers/statsValidation';
import { ITempMatch, ITempMatchPlayers } from '../../types';

interface Props {
  match: ITempMatch;
  players: ITempMatchPlayers[];
}

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

    data.push({ label, value: valueText(value, total, isValid, isExact) });
  });

  return (
    <SectionContainer>
      <TextList data={data} />
    </SectionContainer>
  );
}
