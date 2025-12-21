import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_AWARD, FETCH_AWARD, FETCH_AWARDS, DELETE_AWARD } from '../graphql';

import { PAGES } from '../constants';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { useSeasons } from '../../../hooks/useSeasons.ts';
import { IAward } from '../types';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../constants';
import { Spinner } from '../../../components/loaders';
import { useMatchPlayersInput } from '../../matches/hooks/useMatchPlayersInput.ts';
import { ISelectOptions } from '../../../components/inputs/SelectInput.tsx';
import AwardForm from './components/AwardForm.tsx';
import { PageHeader } from '../../../components';

export default function EditAward() {
  const { awardId, teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<Partial<IAward | null>>(null);

  const { loading, error, data, refetch } = useQuery(FETCH_AWARD, {
    variables: { awardId },
    notifyOnNetworkStatusChange: true,
  });

  const [editAward, { error: editError, loading: editLoading }] = useMutation(EDIT_AWARD, {
    variables: { teamId, awardId },
    refetchQueries: [{ query: FETCH_AWARDS, variables: { seasonId } }],
  });

  const [deleteAward, { error: deleteError, loading: deleteLoading }] = useMutation(DELETE_AWARD, {
    refetchQueries: [{ query: FETCH_AWARDS, variables: { seasonId } }],
  });

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
    if (data?.award) {
      const { award } = data;
      const mappedValues = () =>
        award?.winners
          ?.map(winner =>
            typeof winner === 'object' && winner !== null && '_id' in winner
              ? (winner as { _id: string })._id
              : undefined
          )
          .filter(p => p !== undefined);

      setDefaultValues({
        ...award,
        winners: mappedValues(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, players]);

  const onDelete = async () => {
    try {
      return deleteAward({ variables: { teamId, awardId } }).then(() => {
        dispatch(showAlert({ text: 'Award deleted successfully', type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const onSubmit = async (formData: Partial<IAward>) => {
    try {
      return editAward({
        variables: { teamId, awardId, ...formData, awardValue: +(formData.awardValue || 0) },
      }).then(() => {
        refetch();
        dispatch(showAlert({ text: 'Award updated successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const hasError = error || editError || deleteError || playersError;
  const isLoading = loading || editLoading || loadingSeasons || playersLoading;

  const renderContent = () => {
    return !isLoading && defaultValues ? (
      <AwardForm
        defaultValues={defaultValues}
        playersOptions={playerOptions}
        onSubmit={onSubmit}
        onDelete={onDelete}
        deleteLoading={deleteLoading}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_AWARD}>
        {hasError ? (
          <ErrorGraphql error={(error || editError || deleteError || playersError) as Error} />
        ) : (
          renderContent()
        )}
      </PageHeader>
    </RouteGuard>
  );
}
