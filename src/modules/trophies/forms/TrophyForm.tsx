import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledSelectInput,
  ControlledTextInput,
  ControlledSwitchInput,
  type ISelectOptions,
  ControlledDateInput,
} from '../../../components';
import { TApolloError } from '../../../types/apollo';
import {
  teamTrophyRequiredFields as requiredFields,
  TrophySchema,
  type TrophyFormData,
} from '../schema/team-trophy';

interface Props {
  onSubmit: (data: TrophyFormData) => void;
  defaultValues: TrophyFormData;
  seasonOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
  hasOrgTrophy: boolean;
}

export default function TrophyForm({
  onSubmit,
  defaultValues,
  seasonOptions,
  loading,
  error,
  hasOrgTrophy,
}: Props) {
  const { t } = useTranslation('trophies');
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<TrophyFormData>({
    defaultValues,
    resolver: zodResolver(TrophySchema),
    mode: 'onChange',
  });

  const isFinal = useWatch({ control, name: 'isFinal' });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ disabled: !isValid || !isDirty }}
      loading={loading}
      error={error}
      formSummary={hasOrgTrophy ? t('FORM.EDIT_ORG_TROPHY') : t('FORM.SUMMARY')}
    >
      {!hasOrgTrophy && (
        <>
          <ControlledTextInput
            control={control}
            name="name"
            disabled={hasOrgTrophy}
            label={t('FORM.LABELS.NAME')}
            required={requiredFields.name}
          />
          <ControlledSelectInput
            control={control}
            name="seasonId"
            disabled={hasOrgTrophy}
            label={t('FORM.LABELS.SEASON')}
            options={seasonOptions}
            required={requiredFields.seasonId}
          />
          <ControlledDateInput
            control={control}
            name="year"
            label={t('FORM.LABELS.YEAR')}
            view="year"
            required={requiredFields.year}
            disabled={hasOrgTrophy}
          />
          <ControlledSwitchInput
            control={control}
            label={t('FORM.LABELS.IS_WINNER')}
            name="isWinner"
            helperText={t('FORM.HELPERS.IS_WINNER')}
            disabled={hasOrgTrophy}
          />
          <ControlledSwitchInput
            control={control}
            label={t('FORM.LABELS.IS_FINAL')}
            name="isFinal"
            helperText={t('FORM.HELPERS.IS_FINAL')}
            disabled={hasOrgTrophy}
          />
          {isFinal && (
            <ControlledTextInput
              control={control}
              name="opponent"
              label={t('FORM.LABELS.OPPONENT')}
              required={requiredFields.opponent}
              disabled={hasOrgTrophy}
              helperText={t('FORM.HELPERS.OPPONENT')}
            />
          )}
        </>
      )}

      <ControlledTextInput
        control={control}
        name="comment"
        label={t('FORM.LABELS.COMMENT')}
        required={requiredFields.comment}
        multiline
      />
    </FormContainer>
  );
}
