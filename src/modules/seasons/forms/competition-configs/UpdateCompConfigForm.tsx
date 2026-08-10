import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CustomButton, ISelectOptions, SectionContainer } from '../../../../components';
import { FormContainer } from '../../../../components/forms';
import { CustomGridContainer, CustomGridItem } from '../../../../components/grids';
import { AppIcon } from '../../../../components/icons';
import { ControlledSelectInput, ControlledMultiSelectInput } from '../../../../components/inputs';
import { FormModal } from '../../../../components/modals';
import { getNumberOptions } from '../../../../utils';
import { isCupCompetitionType } from '../../constants';
import {
  requiredFields,
  UpdateCompConfigSchema,
  type UpdateCompConfigFormData,
  type UpdateCompConfigFormInput,
} from './schema';

interface Props {
  competitionName?: string;
  onSubmit: (formData: UpdateCompConfigFormData) => void;
  defaultValues: UpdateCompConfigFormData;
  loading: boolean;
  numberOfTeams: number;
  numberOfCompetitions: number;
  competitionType?: string | null;
  teamOptions: ISelectOptions[];
  tiebreakerOptions: ISelectOptions[];
}

export default function UpdateCompConfigForm({
  competitionName,
  onSubmit,
  defaultValues,
  numberOfTeams,
  numberOfCompetitions,
  competitionType,
  loading,
  teamOptions,
  tiebreakerOptions,
}: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('seasons');
  const isCup = isCupCompetitionType(competitionType);

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid, isDirty },
    reset,
  } = useForm<UpdateCompConfigFormInput, unknown, UpdateCompConfigFormData>({
    defaultValues,
    resolver: zodResolver(UpdateCompConfigSchema),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'teams' });
  const selectedTeamIds = (watch('teams') ?? []).map(t => t.teamId);

  const submitHandler = (data: UpdateCompConfigFormData) => {
    onSubmit(data);
    setOpen(false);
  };

  return (
    <>
      <CustomButton onClick={() => setOpen(true)} variant="text">
        {t('CONFIG.EDIT')}
      </CustomButton>
      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title={`${t('CONFIG.EDIT')} ${competitionName}`}
      >
        <FormContainer
          onSubmit={handleSubmit(submitHandler)}
          loading={loading}
          submitBtn={{
            disabled: !isValid || !isDirty,
            text: t('CONFIG.SUBMIT'),
            confirm: { show: false },
          }}
          onReset={() => reset(defaultValues)}
        >
          <ControlledSelectInput
            control={control}
            name="priority"
            label={t('CONFIG.PRIORITY')}
            options={getNumberOptions(numberOfCompetitions, 1)}
            required={requiredFields.priority}
            helperText={t('CONFIG.FORM.HELPERS.PRIORITY')}
          />
          <ControlledSelectInput
            control={control}
            name="rounds"
            label={t('CONFIG.ROUNDS')}
            options={getNumberOptions(50, 0)}
            required={requiredFields.rounds}
            helperText={t('CONFIG.FORM.HELPERS.ROUNDS')}
          />
          <ControlledSelectInput
            control={control}
            name="tiebreaker"
            label={t('CONFIG.TIEBREAKER')}
            options={tiebreakerOptions}
            required={requiredFields.tiebreaker}
          />
          {!isCup ? (
            <>
              <ControlledMultiSelectInput
                control={control}
                name="splitIndexes"
                label={t('CONFIG.SPLIT_FORM')}
                options={getNumberOptions(numberOfTeams, 0)}
                showLabels
                required={requiredFields.splitIndexes}
                helperText={t('CONFIG.FORM.HELPERS.SPLIT')}
              />
              <ControlledMultiSelectInput
                control={control}
                name="promotionPositions"
                label={t('CONFIG.PROMOTION_FORM')}
                options={getNumberOptions(numberOfTeams, 1)}
                required={requiredFields.promotionPositions}
              />
              <ControlledMultiSelectInput
                control={control}
                name="relegationPositions"
                label={t('CONFIG.RELEGATION_FORM')}
                options={getNumberOptions(numberOfTeams, 1)}
                required={requiredFields.relegationPositions}
              />
            </>
          ) : null}

          <SectionContainer
            title={`${t('CONFIG.TEAMS')} / ${t('CONFIG.STARTING_POINTS')}`}
            subtitle={t('CONFIG.FORM.HELPERS.TEAMS')}
            type="info"
          >
            {fields.map((field, index) => (
              <CustomGridContainer key={field.id}>
                <CustomGridItem size={isCup ? 11 : 8}>
                  <ControlledSelectInput
                    control={control}
                    name={`teams.${index}.teamId`}
                    label={t('CONFIG.TEAM')}
                    options={teamOptions.filter(
                      opt =>
                        !selectedTeamIds.includes(String(opt.value)) ||
                        selectedTeamIds[index] === String(opt.value)
                    )}
                  />
                </CustomGridItem>
                {!isCup ? (
                  <CustomGridItem size={3}>
                    <ControlledSelectInput
                      control={control}
                      name={`teams.${index}.startingPoints`}
                      label={t('CONFIG.STARTING_POINTS')}
                      options={getNumberOptions(20, 0)}
                    />
                  </CustomGridItem>
                ) : null}
                <CustomGridItem size={1}>
                  <AppIcon icon="cross" color="error" size="20px" onClick={() => remove(index)} />
                </CustomGridItem>
              </CustomGridContainer>
            ))}
            {teamOptions.length > fields.length && (
              <CustomButton
                variant="text"
                onClick={() => append({ teamId: '', startingPoints: 0 })}
              >
                {t('CONFIG.ADD_TEAM')}
              </CustomButton>
            )}
          </SectionContainer>
        </FormContainer>
      </FormModal>
    </>
  );
}
