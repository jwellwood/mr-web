import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledDateInput,
  ControlledSelectInput,
  ControlledTextInput,
  SectionContainer,
} from '../../../components';
import type { ISelectOptions } from '../../../components';
import { TApolloError } from '../../../types/apollo';
import { getNumberOptions } from '../../../utils/';
import { requiredFields, SeasonSchema, type SeasonFormData, type SeasonFormInput } from './schema';

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
  } = useForm<SeasonFormInput, unknown, SeasonFormData>({
    defaultValues,
    resolver: zodResolver(SeasonSchema),
    mode: 'onChange',
  });

  const totalTeams = useWatch({ control, name: 'totalFinalPositions' }) as number | undefined;
  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ disabled: !isValid || !isDirty }}
      loading={loading}
      error={error}
      formSummary={t('FORM.SUMMARY')}
    >
      <ControlledSelectInput
        control={control}
        name="orgSeasonId"
        label={t('FORM.LABELS.ORG_SEASON')}
        options={orgSeasonOptions}
        required={requiredFields.orgSeasonId}
      />

      <ControlledDateInput
        control={control}
        name="yearStarted"
        label={t('FORM.LABELS.YEAR_STARTED')}
        view="year"
        required={requiredFields.yearStarted}
      />
      <ControlledDateInput
        control={control}
        name="yearEnded"
        label={t('FORM.LABELS.YEAR_ENDED')}
        view="year"
        disableFuture={false}
        required={requiredFields.yearEnded}
      />
      <SectionContainer type="info" subtitle={t('FORM.HELPERS.NUMBER_OF_TEAMS')}>
        <ControlledSelectInput
          control={control}
          name="division"
          label={t('FORM.LABELS.DIVISION')}
          options={competitionOptions}
          required={requiredFields.division}
        />
        <ControlledSelectInput
          control={control}
          name="totalFinalPositions"
          label={t('FORM.LABELS.NUMBER_OF_TEAMS')}
          options={getNumberOptions(50, 0)}
          required={requiredFields.totalFinalPositions}
        />

        <ControlledSelectInput
          control={control}
          name="leaguePosition"
          label={t('FORM.LABELS.FINAL_POSITION')}
          options={getNumberOptions(totalTeams, 0)}
          required={requiredFields.leaguePosition}
        />
      </SectionContainer>
      <ControlledTextInput
        multiline
        control={control}
        name="comment"
        label={t('FORM.LABELS.COMMENT')}
        required={requiredFields.comment}
      />
    </FormContainer>
  );
}
