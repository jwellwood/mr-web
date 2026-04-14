import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../../../components';
import { FormModal } from '../../../components/modals';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import AddGoalscorersForm from '../forms/add-goalscorers/AddGoalscorersForm';
import {
  addGoalscorersInitialFormState,
  type AddGoalscorersFormData,
} from '../forms/add-goalscorers/schema';
import { ADD_GOALSCORERS, FETCH_RESULT } from '../graphql';
import { useGoalscorerOptions } from '../hooks/useGoalscorerOptions';

interface Props {
  teamId?: string;
  teamName?: string;
  teamGoals?: number;
  side: 'HOME' | 'AWAY';
}

export default function AddGoalscorers({ teamId, teamName, teamGoals = 0, side }: Props) {
  const { t } = useTranslation('results');
  const { resultId, orgSeasonId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { playerOptions, playersLoading } = useGoalscorerOptions(teamId!, orgSeasonId!);

  const [addGoalscorers, { loading, error }] = useMutation(ADD_GOALSCORERS, {
    refetchQueries: [{ query: FETCH_RESULT, variables: { resultId } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.ADD_GOALSCORERS.ERROR'), type: 'error' })),
  });

  const onSubmit = async (formData: AddGoalscorersFormData) => {
    try {
      await addGoalscorers({
        variables: {
          resultId: resultId!,
          data: { goalscorers: formData.goalscorers, side },
        },
      });
      dispatch(showAlert({ text: t('ALERTS.ADD_GOALSCORERS.SUCCESS'), type: 'success' }));
      setOpen(false);
    } catch {
      dispatch(showAlert({ text: t('ALERTS.ADD_GOALSCORERS.ERROR'), type: 'error' }));
    }
  };

  const title = teamName
    ? `${t('BUTTONS.ADD_GOALSCORERS')} – ${teamName}`
    : t('BUTTONS.ADD_GOALSCORERS');

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        <CustomButton variant="text">{title}</CustomButton>
      </span>
      <FormModal open={open} onClose={() => setOpen(false)} title={title}>
        <AddGoalscorersForm
          onSubmit={onSubmit}
          defaultValues={addGoalscorersInitialFormState}
          playerOptions={playerOptions}
          teamGoals={teamGoals}
          loading={playersLoading || loading}
          error={error}
        />
      </FormModal>
    </>
  );
}
