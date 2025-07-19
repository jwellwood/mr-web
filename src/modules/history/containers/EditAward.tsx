import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { PAGES } from '../constants';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { useSeasons } from '../../../hooks/useSeasons';
import { IAward } from '../types';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { PageHeader } from '../../../components/typography';
import { Spinner } from '../../../components/loaders';
import { AWARD_EDIT } from '../graphql/award/award-edit.graphql.ts';
import { AWARD_BY_ID } from '../graphql/award/award-by-id.graphql.ts';
import { GET_SEASON_AWARDS } from '../graphql/award/awards.graphql.ts';
import { DELETE_AWARD } from '../graphql/award/award-delete.graphql.ts';
import AwardForm from '../forms/AwardForm.tsx';
import { useMatchPlayersInput } from '../../matches/hooks/useMatchPlayersInput.ts';
import { ISelectOptions } from '../../../components/inputs/SelectInput.tsx';

const EditAward: React.FC = () => {
  const { awardId, teamId, seasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<Partial<IAward | null>>(null);

  const { loading, error, data, refetch } = useQuery(AWARD_BY_ID, {
    variables: { awardId },
    notifyOnNetworkStatusChange: true,
  });

  const [editAward, { error: editError, loading: editLoading }] = useMutation(AWARD_EDIT, {
    variables: { teamId, awardId },
    refetchQueries: [{ query: GET_SEASON_AWARDS, variables: { seasonId } }],
  });

  const [deleteAward, { error: deleteError, loading: deleteLoading }] = useMutation(DELETE_AWARD, {
    refetchQueries: [{ query: GET_SEASON_AWARDS, variables: { seasonId } }],
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

  const children = hasError ? (
    <ErrorGraphql error={(error || editError || deleteError || playersError) as Error} />
  ) : !isLoading && defaultValues ? (
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

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_AWARD} />
      {children}
    </RouteGuard>
  );
};

export default EditAward;
