import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { PAGES } from '../constants';
import TrophyForm from '../forms/TrophyForm';
import { GET_TROPHY_BY_ID, EDIT_TROPHY, DELETE_TROPHY, GET_TROPHIES } from '../graphql/trophy';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { useSeasons } from '../../../hooks/useSeasons';
import { ITrophy } from '../types';
import { showAlert } from '../../../store/features/alerts/alertsSlice';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { PageHeader } from '../../../components/typography';
import { Spinner } from '../../../components/loaders';

const EditTrophy: React.FC = () => {
  const { teamId, trophyId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<Partial<ITrophy | null>>(null);

  const { loading, error, data, refetch } = useQuery(GET_TROPHY_BY_ID, {
    variables: { trophyId },
    notifyOnNetworkStatusChange: true,
  });

  const [editTrophy, { error: editError, loading: editLoading }] = useMutation(EDIT_TROPHY, {
    refetchQueries: [{ query: GET_TROPHIES, variables: { teamId } }],
  });

  const [deleteTrophy, { error: deleteError, loading: deleteLoading }] = useMutation(
    DELETE_TROPHY,
    {
      refetchQueries: [{ query: GET_TROPHIES, variables: { teamId } }],
    }
  );

  useEffect(() => {
    if (data?.trophy && seasonOptions.length) {
      const { trophy } = data;
      const seasonId =
        (seasonOptions?.find(season => season.label === trophy.season)?.value as string) || '';
      setDefaultValues({
        ...trophy,
        seasonId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onDelete = async () => {
    try {
      return deleteTrophy({ variables: { teamId, trophyId } }).then(() => {
        dispatch(showAlert({ text: 'Trophy deleted successfully', type: 'success' }));
        navigate(-2);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const onSubmit = async (formData: Partial<ITrophy>) => {
    try {
      return editTrophy({ variables: { teamId, trophyId, ...formData } }).then(() => {
        refetch();
        dispatch(showAlert({ text: 'Trophy updated successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const hasError = error || editError || deleteError;
  const isLoading = loading || editLoading || loadingSeasons;

  const children = hasError ? (
    <ErrorGraphql error={(error || editError || deleteError) as Error} />
  ) : !isLoading && defaultValues ? (
    <TrophyForm
      defaultValues={defaultValues}
      seasonOptions={seasonOptions}
      onSubmit={onSubmit}
      onDelete={onDelete}
      deleteLoading={deleteLoading}
    />
  ) : (
    <Spinner />
  );

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_TROPHY} />
      {children}
    </RouteGuard>
  );
};

export default EditTrophy;
