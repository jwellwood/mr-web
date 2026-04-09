import { Control, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ControlledSelectInput,
  ControlledSwitchInput,
  ISelectOptions,
  SectionContainer,
} from '../../../../components';
import { CustomGridContainer, CustomGridItem } from '../../../../components/grids';
import { AppIcon } from '../../../../components/icons';
import { getNumberOptions } from '../../../../utils';
import { getKickoffTimeOptions } from '../../helpers/getKickoffTimeOptions';
import { getHomeAwayOptions } from './getHomeAwayOptions';

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
  const { t } = useTranslation('results');
  const { homeOptions, awayOptions } = getHomeAwayOptions(
    currentHome || '',
    currentAway || '',
    teamOptions,
    excludedTeams
  );
  return (
    <SectionContainer
      title={`${t('SECTIONS.MATCH_NUMBER')} ${index + 1}`}
      secondaryAction={
        <AppIcon icon="cross" color="secondary" size="20px" onClick={() => remove(index)} />
      }
      type="success"
    >
      <CustomGridContainer>
        <CustomGridItem size={6}>
          <ControlledSelectInput
            control={control}
            name={`matches.${index}.homeTeam`}
            label={t('FORMS.HOME_TEAM')}
            options={homeOptions}
          />
        </CustomGridItem>
        <CustomGridItem size={6}>
          <ControlledSelectInput
            control={control}
            name={`matches.${index}.awayTeam`}
            label={t('FORMS.AWAY_TEAM')}
            options={awayOptions}
          />
        </CustomGridItem>
        <CustomGridItem size={4}>
          <ControlledSelectInput
            control={control}
            name={`matches.${index}.kickoffTime`}
            label={t('FORMS.KICKOFF_TIME')}
            options={getKickoffTimeOptions()}
          />
        </CustomGridItem>
        <CustomGridItem size={4}>
          <ControlledSelectInput
            control={control}
            name={`matches.${index}.homeGoals`}
            label={t('FORMS.HOME_GOALS')}
            options={getNumberOptions(99, 0)}
          />
        </CustomGridItem>

        <CustomGridItem size={4}>
          <ControlledSelectInput
            control={control}
            name={`matches.${index}.awayGoals`}
            label={t('FORMS.AWAY_GOALS')}
            options={getNumberOptions(99, 0)}
          />
        </CustomGridItem>
        <CustomGridItem size={12}>
          <ControlledSwitchInput
            control={control}
            name={`matches.${index}.isComplete` as Path<T>}
            label={t('FORMS.COMPLETED')}
          />
        </CustomGridItem>
      </CustomGridContainer>
    </SectionContainer>
  );
}
