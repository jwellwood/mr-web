import { zodResolver } from '@hookform/resolvers/zod';
import { isFuture } from 'date-fns';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ControlledDateInput,
  ControlledSelectInput,
  ControlledSwitchInput,
  FormContainer,
  ISelectOptions,
  SectionContainer,
} from '../../../../components';
import { CustomGridContainer, CustomGridItem } from '../../../../components/grids';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
import ResultConfirmation from '../../components/ResultConfirmation';
import { getKickoffTimeOptions } from '../../helpers/getKickoffTimeOptions';
import { isCupMatch } from '../../helpers/isCupMatch';
import { useCompetitionRoundOptions } from '../../hooks/useResultInput';
import { useResultEffects } from '../useResultEffects';
import type { ResultFormData } from './schema';
import { requiredFields, ResultSchema } from './schema';

interface Props {
  onSubmit: (formData: ResultFormData) => void;
  competitionOptions: ISelectOptions[];
  teamOptions: ISelectOptions[];
  competitionTeamMap: Map<string, ISelectOptions[]>;
  orgSeasonOptions: ISelectOptions[];
  defaultValues: ResultFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function ResultForm({
  onSubmit,
  defaultValues,
  competitionOptions,
  teamOptions,
  competitionTeamMap,
  orgSeasonOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('results');
  const decisionOptions = [
    { label: '', value: '' },
    { label: t('FORM.OPTIONS.DECISION.EXTRA_TIME'), value: 'EXTRA_TIME' },
    { label: t('FORM.OPTIONS.DECISION.PENALTIES'), value: 'PENALTIES' },
  ];
  const winnerSideOptions = [
    { label: '', value: '' },
    { label: t('FORM.OPTIONS.WINNER_SIDE.HOME'), value: 'HOME' },
    { label: t('FORM.OPTIONS.WINNER_SIDE.AWAY'), value: 'AWAY' },
  ];
  const {
    handleSubmit,
    control,
    clearErrors,
    setValue,
    formState: { isDirty, isValid },
    reset,
  } = useForm<ResultFormData>({
    defaultValues,
    resolver: zodResolver(ResultSchema),
    mode: 'onChange',
  });

  const currentDate = useWatch({ control, name: 'date' });
  const currentSeasonId = useWatch({ control, name: 'orgSeasonId' });
  const currentCompetitionId = useWatch({ control, name: 'competitionId' });
  const currentGameWeek = useWatch({ control, name: 'gameWeek' });
  const isBye = useWatch({ control, name: 'isBye' });
  const currentValues = useWatch({ control });
  const isFutureMatch = isFuture(new Date(currentDate));
  const isCup = isCupMatch(competitionOptions, currentCompetitionId);
  const activeTeamOptions =
    (currentCompetitionId && competitionTeamMap.get(currentCompetitionId)) || teamOptions;

  const { roundOptions } = useCompetitionRoundOptions(
    currentSeasonId,
    currentCompetitionId,
    isCup ? 'cup' : undefined
  );
  const showGameWeek = Boolean(currentCompetitionId);
  const gameWeekLabel = isCup ? t('LABELS.ROUND') : t('FORM.LABELS.GAME_WEEK');

  useResultEffects({
    currentCompetitionId,
    currentSeasonId,
    currentGameWeek,
    isBye,
    isCup,
    roundOptions,
    showGameWeek,
    setValue,
    clearErrors,
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{
        disabled: !isValid || !isDirty,
        confirm: {
          show: true,
          content: (
            <ResultConfirmation
              result={currentValues as ResultFormData}
              teamOptions={teamOptions}
            />
          ),
        },
      }}
      loading={loading}
      error={error}
    >
      <SectionContainer title={t('FORM.HEADERS.MATCH')} type="form">
        <ControlledDateInput
          control={control}
          name="date"
          label={t('FORM.LABELS.DATE')}
          disableFuture={false}
          required={requiredFields.date}
        />
        <ControlledSelectInput
          control={control}
          name="kickoffTime"
          label={t('FORM.LABELS.KICKOFF_TIME')}
          options={getKickoffTimeOptions()}
          required={requiredFields.kickoffTime}
        />
        <ControlledSelectInput
          control={control}
          name="orgSeasonId"
          label={t('FORM.LABELS.SEASON')}
          options={orgSeasonOptions}
          required={requiredFields.orgSeasonId}
        />
        <SectionContainer title={t('FORM.HEADERS.COMPETITION')} type="info">
          <ControlledSelectInput
            control={control}
            name="competitionId"
            label={t('FORM.LABELS.COMPETITION')}
            options={competitionOptions}
            required={requiredFields.competitionId}
          />

          {showGameWeek ? (
            <ControlledSelectInput
              control={control}
              name="gameWeek"
              label={gameWeekLabel}
              options={roundOptions}
              required={requiredFields.gameWeek}
            />
          ) : null}
          {isCup ? (
            <ControlledSwitchInput control={control} name="isBye" label={t('FORM.LABELS.IS_BYE')} />
          ) : null}
        </SectionContainer>
      </SectionContainer>

      <SectionContainer title={t('FORM.HEADERS.RESULT')} type="info">
        <CustomGridContainer>
          <CustomGridItem size={isBye ? 12 : 9}>
            <ControlledSelectInput
              control={control}
              name="homeTeam"
              label={t(isBye ? 'FORM.LABELS.BYE_TEAM' : 'FORM.LABELS.HOME_TEAM')}
              options={activeTeamOptions}
              required={requiredFields.homeTeam}
            />
          </CustomGridItem>
          <CustomGridItem size={isBye ? 12 : 3}>
            {!isFutureMatch && !isBye && (
              <ControlledSelectInput
                control={control}
                disabled={isBye}
                name="homeGoals"
                label={t('FORM.LABELS.HOME_GOALS')}
                options={getNumberOptions(50, 0)}
                required={requiredFields.homeGoals}
              />
            )}
          </CustomGridItem>
          {!isBye ? (
            <CustomGridItem size={isBye ? 12 : 9}>
              {
                <ControlledSelectInput
                  control={control}
                  disabled={isBye}
                  name="awayTeam"
                  label={t('FORM.LABELS.AWAY_TEAM')}
                  options={activeTeamOptions}
                  required={requiredFields.awayTeam}
                />
              }
            </CustomGridItem>
          ) : null}
          {!isBye ? (
            <CustomGridItem size={isBye ? 12 : 3}>
              {!isFutureMatch && (
                <ControlledSelectInput
                  control={control}
                  disabled={isBye}
                  name="awayGoals"
                  label={t('FORM.LABELS.AWAY_GOALS')}
                  options={getNumberOptions(50, 0)}
                  required={requiredFields.awayGoals}
                />
              )}
            </CustomGridItem>
          ) : null}
        </CustomGridContainer>

        {!isBye ? (
          <ControlledSwitchInput
            control={control}
            name="isForfeit"
            label={t('FORM.LABELS.FORFEIT')}
          />
        ) : null}
        {isCup && !isBye && currentValues.homeGoals === currentValues.awayGoals ? (
          <>
            <ControlledSelectInput
              control={control}
              name="decision"
              label={t('FORM.LABELS.DECISION')}
              options={decisionOptions}
              required={requiredFields.decision}
            />
            <ControlledSelectInput
              control={control}
              name="winnerSide"
              label={t('FORM.LABELS.WINNER_SIDE')}
              options={winnerSideOptions}
              required={requiredFields.winnerSide}
            />
          </>
        ) : null}
      </SectionContainer>

      <ControlledSwitchInput
        control={control}
        name="isComplete"
        label={t('FORM.LABELS.COMPLETED')}
      />
    </FormContainer>
  );
}
