import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledDateInput,
  ControlledMultiSelectInput,
  ControlledSelectInput,
  ControlledTextInput,
  ControlledSwitchInput,
  type ISelectOptions,
} from '../../../../components';
import { positionOptions } from '../../../../constants';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
import { type PlayerFormData, PlayerSchema, requiredFields } from './schema';

interface Props {
  onSubmit: (data: PlayerFormData) => void;
  defaultValues: PlayerFormData;
  countryOptions: ISelectOptions[];
  seasonOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function PlayerForm({
  onSubmit,
  defaultValues,
  countryOptions,
  seasonOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('players');
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<PlayerFormData>({
    defaultValues: defaultValues as PlayerFormData,
    resolver: zodResolver(PlayerSchema),
    mode: 'onChange',
  });

  const isHallOfFame = useWatch({ control, name: 'isHallOfFame' });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ disabled: !isValid || !isDirty }}
      loading={loading}
      error={error}
    >
      <ControlledTextInput
        control={control}
        name="name"
        label={t('FORM.LABELS.NAME')}
        required={requiredFields.name}
      />
      <ControlledSelectInput
        control={control}
        name="nationality"
        label={t('FORM.LABELS.NATIONALITY')}
        options={countryOptions}
        required={requiredFields.nationality}
      />
      <ControlledDateInput
        control={control}
        name="dateOfBirth"
        label={t('FORM.LABELS.DATE_OF_BIRTH')}
        required={requiredFields.dateOfBirth}
      />
      <ControlledDateInput
        control={control}
        name="yearJoined"
        label={t('FORM.LABELS.YEAR_JOINED')}
        required={requiredFields.yearJoined}
        view="year"
      />
      <ControlledSelectInput
        control={control}
        name="position"
        label={t('FORM.LABELS.POSITION')}
        required={requiredFields.position}
        options={positionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="squadNumber"
        label={t('FORM.LABELS.SQUAD_NUMBER')}
        required={requiredFields.squadNumber}
        options={getNumberOptions(99)}
      />
      <ControlledMultiSelectInput
        control={control}
        name="seasonIds"
        options={seasonOptions}
        label={t('FORM.LABELS.SEASONS')}
        required={requiredFields.seasonIds}
      />
      <ControlledSwitchInput
        control={control}
        name="isCaptain"
        label={t('FORM.LABELS.IS_CAPTAIN')}
      />
      <ControlledSwitchInput
        control={control}
        name="isViceCaptain"
        label={t('FORM.LABELS.IS_VICE_CAPTAIN')}
      />
      <ControlledSwitchInput
        control={control}
        name="isHallOfFame"
        label={t('FORM.LABELS.IS_HALL_OF_FAME')}
      />
      {isHallOfFame && (
        <ControlledTextInput
          control={control}
          name="description"
          label={t('FORM.LABELS.DESCRIPTION')}
          helperText={t('FORM.HELPERS.DESCRIPTION')}
          required={requiredFields.description}
        />
      )}
    </FormContainer>
  );
}
