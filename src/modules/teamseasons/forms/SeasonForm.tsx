import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledDateInput,
  ControlledSelectInput,
  ControlledTextInput,
  SectionContainer,
  CustomTypography,
} from '../../../components';
import type { ISelectOptions } from '../../../components';
import { TApolloError } from '../../../types/apollo';
import { getNumberOptions } from '../../../utils/';
import { SeasonSchema, type SeasonFormData } from './schema';

interface Props {
  onSubmit: (formData: SeasonFormData) => void;
  defaultValues: SeasonFormData;
  competitionOptions: ISelectOptions[];
  orgSeasonOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function SeasonForm({
  onSubmit,
  defaultValues,
  competitionOptions,
  orgSeasonOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('teamseasons');
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<SeasonFormData>({
    defaultValues,
    resolver: zodResolver(SeasonSchema),
    mode: 'onChange',
  });

  const totalTeams = useWatch({ control, name: 'totalFinalPositions' });
  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ disabled: !isValid || !isDirty }}
      loading={loading}
      error={error}
    >
      <SectionContainer type="info">
        <CustomTypography color="data">{t('FORM.INFO.ORG_SEASON')}</CustomTypography>
      </SectionContainer>
      <ControlledSelectInput
        control={control}
        name="orgSeasonId"
        label={t('FORM.LABELS.ORG_SEASON')}
        options={orgSeasonOptions}
      />

      <ControlledDateInput
        control={control}
        name="yearStarted"
        label={t('FORM.LABELS.YEAR_STARTED')}
        view="year"
      />
      <ControlledDateInput
        control={control}
        name="yearEnded"
        label={t('FORM.LABELS.YEAR_ENDED')}
        view="year"
        disableFuture={false}
      />
      <ControlledSelectInput
        control={control}
        name="division"
        label={t('FORM.LABELS.DIVISION')}
        options={competitionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="totalFinalPositions"
        label={t('FORM.LABELS.NUMBER_OF_TEAMS')}
        options={getNumberOptions(50, 0)}
      />
      {totalTeams ? (
        <ControlledSelectInput
          control={control}
          name="leaguePosition"
          label={t('FORM.LABELS.FINAL_POSITION')}
          options={getNumberOptions(totalTeams, 0)}
        />
      ) : null}
      <ControlledTextInput
        multiline
        control={control}
        name="comment"
        label={t('FORM.LABELS.COMMENT')}
      />
    </FormContainer>
  );
}
