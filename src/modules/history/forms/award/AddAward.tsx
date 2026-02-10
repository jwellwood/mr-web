import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { useMatchPlayersInput } from '../../../matches/hooks/useMatchPlayersInput';
import { PAGES } from '../../constants';
import { ADD_AWARD, FETCH_AWARDS } from '../../graphql';
import AwardForm from './AwardForm';
import { initialAwardState } from './state';
import type { AwardFormData } from './validation';

export default function AddAward() {
  const { teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const defaultValues: AwardFormData = initialAwardState;
  const {
    players,
    loading: playersLoading,
    error: playersError,
  } = useMatchPlayersInput(teamId, seasonId);

  const playerOptions: ISelectOptions[] = useMemo(
    () =>
      players?.map(player => ({
        label: player.name,
        value: player._id,
      })),
    [players]
  );
  const [addAward, { error, loading }] = useMutation(ADD_AWARD, {
    refetchQueries: [{ query: FETCH_AWARDS, variables: { seasonId } }],
  });

  const onSubmit = async (formData: AwardFormData) => {
    try {
      return addAward({
        variables: {
          ...formData,
          teamId: teamId!,
          seasonId: seasonId!,
          awardValue: +(formData.awardValue || 0),
        },
      }).then(() => {
        dispatch(showAlert({ text: 'Award added successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  return (
    <PageHeader title={PAGES.ADD_AWARD}>
      <AwardForm
        onSubmit={onSubmit}
        defaultValues={defaultValues}
        playersOptions={playerOptions}
        loading={loading || playersLoading}
        error={error || playersError}
      />
    </PageHeader>
  );
}
