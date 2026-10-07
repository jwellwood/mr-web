import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledSelectInput,
  ControlledTextInput,
  type ISelectOptions,
} from '../../../components';
import { TApolloError } from '../../../types/apollo';
import {
  orgTrophyRequiredFields as requiredFields,
  OrgTrophySchema,
  type OrgTrophyFormData,
} from '../schema/org-trophy';

interface Props {
  onSubmit: (data: OrgTrophyFormData) => void;
  defaultValues: OrgTrophyFormData;
  competitionOptions: ISelectOptions[];
  teamOptionsByCompetition: Record<string, ISelectOptions[]>;
  loading: boolean;
  error?: TApolloError;
}

export default function OrgTrophyForm({
  onSubmit,
  defaultValues,
  competitionOptions,
  teamOptionsByCompetition,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('trophies');
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
    setValue,
  } = useForm<OrgTrophyFormData>({
    defaultValues,
    resolver: zodResolver(OrgTrophySchema),
    mode: 'onChange',
  });

  const competition = useWatch({
    control,
    name: 'competitionId',
  });
  const teamOptions = teamOptionsByCompetition[competition] ?? [];
  const previousCompetition = useRef(defaultValues.competitionId);

  useEffect(() => {
    if (competition === previousCompetition.current) return;
    previousCompetition.current = competition;
    const options = { shouldDirty: true, shouldValidate: true };
    setValue('winningTeamId', '', options);
    setValue('runnerUpTeamId', '', options);
  }, [competition, setValue]);

  const onReset = () => {
    // Keeps the effect above from clearing the teams that reset restores.
    previousCompetition.current = defaultValues.competitionId;
    reset(defaultValues);
  };

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      submitBtn={{ disabled: !isValid || !isDirty }}
      loading={loading}
      error={error}
      formSummary={t('FORM.ORG_SUMMARY')}
    >
      <ControlledSelectInput
        control={control}
        name="competitionId"
        label={t('FORM.LABELS.COMPETITION')}
        options={competitionOptions}
        required={requiredFields.competitionId}
      />
      {competition && (
        <>
          <ControlledSelectInput
            control={control}
            name="winningTeamId"
            label={t('FORM.LABELS.WINNING_TEAM')}
            options={teamOptions}
            required={requiredFields.winningTeamId}
          />
          <ControlledSelectInput
            control={control}
            name="runnerUpTeamId"
            label={t('FORM.LABELS.RUNNER_UP_TEAM')}
            options={teamOptions}
            required={requiredFields.runnerUpTeamId}
          />
          <ControlledTextInput
            control={control}
            name="comment"
            label={t('FORM.LABELS.COMMENT')}
            required={requiredFields.comment}
            multiline
          />
        </>
      )}
    </FormContainer>
  );
}
