import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@mui/material';
import { useMemo } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledSelectInput, FormContainer, type ISelectOptions } from '../../../../components';
import { CustomGridContainer, CustomGridItem } from '../../../../components/grids';
import { APP_ICONS, AppIcon } from '../../../../components/icons';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
import { createAddGoalscorersSchema, type AddGoalscorersFormData } from './schema';

interface Props {
  onSubmit: (formData: AddGoalscorersFormData) => void;
  defaultValues: AddGoalscorersFormData;
  playerOptions: ISelectOptions[];
  teamGoals: number;
  loading: boolean;
  error?: TApolloError;
}

export default function AddGoalscorersForm({
  onSubmit,
  defaultValues,
  playerOptions,
  teamGoals,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('results');
  const schema = useMemo(() => createAddGoalscorersSchema(teamGoals), [teamGoals]);
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<AddGoalscorersFormData>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const { fields, append, remove } = useFieldArray({ name: 'goalscorers', control });
  const goalscorers = useWatch({ control, name: 'goalscorers' });

  const totalAssignedGoals = goalscorers?.reduce((sum, g) => sum + (Number(g?.goals) || 0), 0) ?? 0;
  const remainingGoals = teamGoals - totalAssignedGoals;

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ disabled: !isValid || !isDirty }}
      loading={loading}
      error={error}
    >
      {fields.map((field, index) => {
        const otherGoals =
          goalscorers?.reduce(
            (sum, g, idx) => (idx !== index ? sum + (Number(g?.goals) || 0) : sum),
            0
          ) ?? 0;
        const maxGoals = teamGoals - otherGoals;

        return (
          <CustomGridContainer key={field.id} direction="row">
            <CustomGridItem size={8}>
              <ControlledSelectInput
                control={control}
                name={`goalscorers.${index}.playerId`}
                label={t('FORMS.PLAYER')}
                options={playerOptions}
              />
            </CustomGridItem>
            <CustomGridItem size={3}>
              <ControlledSelectInput
                control={control}
                name={`goalscorers.${index}.goals`}
                label={t('FORMS.GOALS')}
                options={getNumberOptions(maxGoals, 1)}
              />
            </CustomGridItem>
            <CustomGridItem size={1}>
              <AppIcon icon={APP_ICONS.CROSS} color="error" onClick={() => remove(index)} />
            </CustomGridItem>
          </CustomGridContainer>
        );
      })}
      <Button
        variant="outlined"
        onClick={() => append({ playerId: '', goals: 1 })}
        disabled={remainingGoals <= 0}
      >
        {t('BUTTONS.ADD_GOALSCORER')}
      </Button>
    </FormContainer>
  );
}
