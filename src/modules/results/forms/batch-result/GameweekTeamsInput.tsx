import { Control } from 'react-hook-form';
import { ControlledSelectInput, ISelectOptions, SectionContainer } from '../../../../components';
import { CustomGridContainer, CustomGridItem } from '../../../../components/grids';
import { AppIcon } from '../../../../components/icons';
import { getNumberOptions } from '../../../../utils';

interface Props<T extends object> {
  index: number;
  control: Control<T>;
  teamOptions: ISelectOptions[];
  remove: (index: number) => void;
  excludedTeams?: string[];
  currentHome?: string;
  currentAway?: string;
}

export default function GameweekTeamsInput<T extends object>({
  index,
  control,
  teamOptions,
  remove,
  excludedTeams = [],
  currentHome,
  currentAway,
}: Props<T>) {
  const excl = excludedTeams || [];
  const homeOptions = teamOptions.filter(o => {
    const v = String(o.value);
    if (v === currentHome) return true; // keep currently selected value
    if (v === currentAway) return false; // prevent selecting same as away in this row
    if (excl.includes(v)) return false; // exclude teams used in other rows
    return true;
  });

  const awayOptions = teamOptions.filter(o => {
    const v = String(o.value);
    if (v === currentAway) return true;
    if (v === currentHome) return false;
    if (excl.includes(v)) return false;
    return true;
  });
  return (
    <SectionContainer
      title={`Match ${index + 1}`}
      secondaryAction={
        <AppIcon icon="cross" color="secondary" size="20px" onClick={() => remove(index)} />
      }
      type="success"
    >
      <CustomGridContainer>
        <CustomGridItem size={9}>
          <ControlledSelectInput
            control={control}
            name={`matches.${index}.homeTeam`}
            label="Home"
            options={homeOptions}
          />
        </CustomGridItem>
        <CustomGridItem size={3}>
          <ControlledSelectInput
            control={control}
            name={`matches.${index}.homeGoals`}
            label="Goals"
            options={getNumberOptions(20, 0)}
          />
        </CustomGridItem>
        <CustomGridItem size={9}>
          <ControlledSelectInput
            control={control}
            name={`matches.${index}.awayTeam`}
            label="Away"
            options={awayOptions}
          />
        </CustomGridItem>
        <CustomGridItem size={3}>
          <ControlledSelectInput
            control={control}
            name={`matches.${index}.awayGoals`}
            label="Goals"
            options={getNumberOptions(20, 0)}
          />
        </CustomGridItem>
      </CustomGridContainer>
    </SectionContainer>
  );
}
