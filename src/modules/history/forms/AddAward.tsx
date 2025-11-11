import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_AWARD, FETCH_AWARDS } from '../graphql';

import { PAGES } from '../constants';
import { IAward } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { useMatchPlayersInput } from '../../matches/hooks/useMatchPlayersInput';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import ErrorGraphql from '../../../errors/ErrorGraphql';
import RouteGuard from '../../../router/RouteGuard';
import { AuthRoles } from '../../../constants.ts';
import { PageHeader } from '../../../components/typography';
import { Spinner } from '../../../components/loaders';
import AwardForm from './components/AwardForm.tsx';
import { initialAwardState } from './state.ts';

export default function AddAward() {
  const { teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<null | Partial<IAward>>(null);
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

  useEffect(() => {
    setDefaultValues({ ...initialAwardState });
  }, [players]);

  const [addAward, { error, loading }] = useMutation(ADD_AWARD, {
    refetchQueries: [{ query: FETCH_AWARDS, variables: { seasonId } }],
  });

  const onSubmit = async (formData: Partial<IAward>) => {
    try {
      return addAward({
        variables: {
          ...formData,
          teamId,
          seasonId,
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

  const renderContent = () => {
    return !loading && !playersLoading && defaultValues ? (
      <AwardForm onSubmit={onSubmit} defaultValues={defaultValues} playersOptions={playerOptions} />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.ADD_AWARD} />
      {error || playersError ? (
        <ErrorGraphql error={(error || playersError) as Error} />
      ) : (
        renderContent()
      )}
    </RouteGuard>
  );
}
