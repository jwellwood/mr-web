import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledTextInput,
  ControlledDateInput,
  ControlledSelectInput,
  ControlledColorInput,
  ControlledSwitchInput,
} from '../../../../components';
import { useNationality } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { surfaceOptions } from '../../constants';
import { EditTeamSchema, type EditTeamFormData } from './schema';

interface Props {
  onSubmit: (data: EditTeamFormData) => void;
  defaultValues: EditTeamFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function EditTeamForm({ onSubmit, defaultValues, loading, error }: Props) {
  const { nationalityOptions } = useNationality();
  const { t } = useTranslation('team');
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<EditTeamFormData>({
    defaultValues,
    resolver: zodResolver(EditTeamSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{ disabled: !isDirty || !isValid }}
      onReset={() => reset(defaultValues)}
      loading={loading}
      error={error}
    >
      <ControlledSwitchInput name="isActive" label={t('FORM.LABELS.IS_ACTIVE')} control={control} />
      <ControlledTextInput control={control} name="teamName" label={t('FORM.LABELS.TEAM_NAME')} />
      <ControlledDateInput
        control={control}
        name="yearFounded"
        label={t('FORM.LABELS.YEAR_FOUNDED')}
        view="year"
      />
      <ControlledTextInput control={control} name="location" label={t('FORM.LABELS.CITY')} />
      <ControlledSelectInput
        control={control}
        name="country"
        label={t('FORM.LABELS.COUNTRY')}
        options={nationalityOptions}
      />
      <ControlledTextInput
        control={control}
        name="stadiumName"
        label={t('FORM.LABELS.STADIUM.NAME')}
      />
      <ControlledTextInput
        control={control}
        name="stadiumLocation"
        label={t('FORM.LABELS.STADIUM.LOCATION')}
        multiline
      />
      <ControlledSelectInput
        control={control}
        options={surfaceOptions}
        name="stadiumSurface"
        label={t('FORM.LABELS.STADIUM.SURFACE')}
      />
      <ControlledTextInput
        control={control}
        name="stadiumCapacity"
        label={t('FORM.LABELS.STADIUM.CAPACITY')}
      />
      <ControlledColorInput
        control={control}
        name="homeShirt"
        label={t('FORM.LABELS.KIT.HOME.SHIRT')}
      />
      <ControlledColorInput
        control={control}
        name="homeShorts"
        label={t('FORM.LABELS.KIT.HOME.SHORTS')}
      />
      <ControlledColorInput
        control={control}
        name="homeSocks"
        label={t('FORM.LABELS.KIT.HOME.SOCKS')}
      />
      <ControlledColorInput
        control={control}
        name="awayShirt"
        label={t('FORM.LABELS.KIT.AWAY.SHIRT')}
      />
      <ControlledColorInput
        control={control}
        name="awayShorts"
        label={t('FORM.LABELS.KIT.AWAY.SHORTS')}
      />
      <ControlledColorInput
        control={control}
        name="awaySocks"
        label={t('FORM.LABELS.KIT.AWAY.SOCKS')}
      />
      <ControlledColorInput
        control={control}
        name="kitsBackground"
        label={t('FORM.LABELS.KIT.BACKGROUND')}
      />
    </FormContainer>
  );
}
