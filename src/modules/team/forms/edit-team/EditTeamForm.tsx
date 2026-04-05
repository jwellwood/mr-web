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
      <ControlledSwitchInput
        name="isActive"
        label={t('FORMS.LABELS.IS_ACTIVE')}
        control={control}
      />
      <ControlledTextInput control={control} name="teamName" label={t('FORMS.LABELS.TEAM_NAME')} />
      <ControlledDateInput
        control={control}
        name="yearFounded"
        label={t('FORMS.LABELS.YEAR_FOUNDED')}
        view="year"
      />
      <ControlledTextInput control={control} name="location" label={t('FORMS.LABELS.CITY')} />
      <ControlledSelectInput
        control={control}
        name="country"
        label={t('FORMS.LABELS.COUNTRY')}
        options={nationalityOptions}
      />
      <ControlledTextInput
        control={control}
        name="stadiumName"
        label={t('FORMS.LABELS.STADIUM.NAME')}
      />
      <ControlledTextInput
        control={control}
        name="stadiumLocation"
        label={t('FORMS.LABELS.STADIUM.LOCATION')}
        multiline
      />
      <ControlledSelectInput
        control={control}
        options={surfaceOptions}
        name="stadiumSurface"
        label={t('FORMS.LABELS.STADIUM.SURFACE')}
      />
      <ControlledTextInput
        control={control}
        name="stadiumCapacity"
        label={t('FORMS.LABELS.STADIUM.CAPACITY')}
      />
      <ControlledColorInput control={control} name="homeShirt" label={t('KIT.HOME.SHIRT')} />
      <ControlledColorInput control={control} name="homeShorts" label={t('KIT.HOME.SHORTS')} />
      <ControlledColorInput control={control} name="homeSocks" label={t('KIT.HOME.SOCKS')} />
      <ControlledColorInput control={control} name="awayShirt" label={t('KIT.AWAY.SHIRT')} />
      <ControlledColorInput control={control} name="awayShorts" label={t('KIT.AWAY.SHORTS')} />
      <ControlledColorInput control={control} name="awaySocks" label={t('KIT.AWAY.SOCKS')} />
      <ControlledColorInput control={control} name="kitsBackground" label={t('KIT.BACKGROUND')} />
    </FormContainer>
  );
}
