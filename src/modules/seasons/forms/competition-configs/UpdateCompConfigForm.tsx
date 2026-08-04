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
import { isCupCompetitionType, TTiebreaker } from '../../constants';
import {
  UpdateCompConfigSchema,
  type UpdateCompConfigFormData,
  type UpdateCompConfigFormInput,
} from './schema';

interface Props {
  onSubmit: (formData: UpdateCompConfigFormData) => void;
  defaultValues: UpdateCompConfigFormData;
  loading: boolean;
  numberOfTeams: number;
  numberOfCompetitions: number;
  competitionType?: string | null;
  teamOptions: ISelectOptions[];
}

export default function UpdateCompConfigForm({
  onSubmit,
  defaultValues,
  numberOfTeams,
  numberOfCompetitions,
  competitionType,
  loading,
  teamOptions,
}: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('seasons');
  const isCup = isCupCompetitionType(competitionType);

  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<UpdateCompConfigFormInput, unknown, UpdateCompConfigFormData>({
    defaultValues,
    resolver: zodResolver(UpdateCompConfigSchema),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'teams' });

  const submitHandler = (data: UpdateCompConfigFormData) => {
    onSubmit(data);
    setOpen(false);
  };

  return (
    <>
      <CustomButton onClick={() => setOpen(true)} variant="text">
        {t('CONFIG.EDIT')}
      </CustomButton>
      <FormModal open={open} onClose={() => setOpen(false)}>
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
            name="rounds"
            label={t('CONFIG.ROUNDS')}
            options={getNumberOptions(50, 0)}
          />
          <ControlledSelectInput
            control={control}
            name="tiebreaker"
            label={t('CONFIG.TIEBREAKER')}
            options={[
              { label: t('CONFIG.HEAD_TO_HEAD'), value: TTiebreaker.HEAD_TO_HEAD },
              { label: t('CONFIG.GOAL_DIFFERENCE'), value: TTiebreaker.GOAL_DIFFERENCE },
              { label: t('CONFIG.PENALTIES'), value: TTiebreaker.PENALTIES },
            ]}
          />
          {!isCup ? (
            <>
              <ControlledMultiSelectInput
                control={control}
                name="splitIndexes"
                label={t('CONFIG.SPLIT_FORM')}
                options={getNumberOptions(numberOfTeams, 0)}
                showLabels
              />
              <ControlledMultiSelectInput
                control={control}
                name="promotionPositions"
                label={t('CONFIG.PROMOTION_FORM')}
                options={getNumberOptions(numberOfTeams, 1)}
              />
              <ControlledMultiSelectInput
                control={control}
                name="relegationPositions"
                label={t('CONFIG.RELEGATION_FORM')}
                options={getNumberOptions(numberOfTeams, 1)}
              />
            </>
          ) : null}
          <ControlledSelectInput
            control={control}
            name="priority"
            label={t('CONFIG.PRIORITY')}
            options={getNumberOptions(numberOfCompetitions, 1)}
          />
          <SectionContainer
            title={`${t('CONFIG.TEAMS')} / ${t('CONFIG.STARTING_POINTS')}`}
            type="info"
          >
            {fields.map((field, index) => (
              <CustomGridContainer key={field.id}>
                <CustomGridItem size={isCup ? 11 : 8}>
                  <ControlledSelectInput
                    control={control}
                    name={`teams.${index}.teamId`}
                    label={t('CONFIG.TEAM')}
                    options={teamOptions}
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
            <CustomButton variant="text" onClick={() => append({ teamId: '', startingPoints: 0 })}>
              {t('CONFIG.ADD_TEAM')}
            </CustomButton>
          </SectionContainer>
        </FormContainer>
      </FormModal>
    </>
  );
}
