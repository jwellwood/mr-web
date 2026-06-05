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
  isCup: boolean;
  isBye?: boolean;
}

export default function GameweekTeamsInput<T extends object>({
  index,
  control,
  teamOptions,
  remove,
  excludedTeams = [],
  currentHome,
  currentAway,
  isCup,
  isBye = false,
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
        {isCup && (
          <CustomGridItem size={12}>
            <ControlledSwitchInput
              control={control}
              name={`matches.${index}.isBye` as Path<T>}
              label={t('FORM.LABELS.IS_BYE')}
            />
          </CustomGridItem>
        )}
        <CustomGridItem size={isBye ? 12 : 6}>
          <ControlledSelectInput
            control={control}
            name={`matches.${index}.homeTeam`}
            label={t('FORM.LABELS.HOME_TEAM')}
            options={homeOptions}
          />
        </CustomGridItem>
        {!isBye && (
          <CustomGridItem size={6}>
            <ControlledSelectInput
              control={control}
              name={`matches.${index}.awayTeam`}
              label={t('FORM.LABELS.AWAY_TEAM')}
              options={awayOptions}
            />
          </CustomGridItem>
        )}
        {!isBye && (
          <CustomGridItem size={4}>
            <ControlledSelectInput
              control={control}
              name={`matches.${index}.kickoffTime`}
              label={t('FORM.LABELS.KICKOFF_TIME')}
              options={getKickoffTimeOptions()}
            />
          </CustomGridItem>
        )}
        {!isBye && (
          <CustomGridItem size={4}>
            <ControlledSelectInput
              control={control}
              name={`matches.${index}.homeGoals`}
              label={t('FORM.LABELS.HOME_GOALS')}
              options={getNumberOptions(99, 0)}
            />
          </CustomGridItem>
        )}
        {!isBye && (
          <CustomGridItem size={4}>
            <ControlledSelectInput
              control={control}
              name={`matches.${index}.awayGoals`}
              label={t('FORM.LABELS.AWAY_GOALS')}
              options={getNumberOptions(99, 0)}
            />
          </CustomGridItem>
        )}

        <CustomGridItem size={12}>
          <ControlledSwitchInput
            control={control}
            name={`matches.${index}.isComplete` as Path<T>}
            label={t('FORM.LABELS.COMPLETED')}
          />
        </CustomGridItem>
      </CustomGridContainer>
    </SectionContainer>
  );
}
