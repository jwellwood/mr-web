import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_TROPHY, EDIT_TROPHY, DELETE_TROPHY, FETCH_TROPHIES } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams, useSeasons } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import RouteGuard from '../../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../../constants';
import { Spinner } from '../../../../components/loaders';
import { PageHeader } from '../../../../components';
import type { TrophyFormData } from './validation';
import TrophyForm from './TrophyForm';

export default function EditTrophy() {
  const { teamId, trophyId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<TrophyFormData | null>(null);

  const { loading, error, data, refetch } = useQuery(FETCH_TROPHY, {
    variables: { trophyId },
    notifyOnNetworkStatusChange: true,
  });

  const [editTrophy, { error: editError, loading: editLoading }] = useMutation(EDIT_TROPHY, {
    refetchQueries: [{ query: FETCH_TROPHIES, variables: { teamId } }],
  });

  const [deleteTrophy, { error: deleteError, loading: deleteLoading }] = useMutation(
    DELETE_TROPHY,
    {
      refetchQueries: [{ query: FETCH_TROPHIES, variables: { teamId } }],
    }
  );

  useEffect(() => {
    if (data?.trophy && seasonOptions.length) {
      const { trophy } = data;
      const seasonId =
        (seasonOptions?.find(season => season.label === trophy.season)?.value as string) || '';
      setDefaultValues({ ...trophy, year: new Date(trophy.year), seasonId });
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

  const onSubmit = async (formData: TrophyFormData) => {
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

  const isLoading = loading || editLoading || loadingSeasons || deleteLoading;

  const renderContent = () => {
    return defaultValues ? (
      <TrophyForm
        defaultValues={defaultValues}
        seasonOptions={seasonOptions}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={isLoading}
        error={error || editError || deleteError}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AUTH_ROLES.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_TROPHY}>{renderContent()}</PageHeader>
    </RouteGuard>
  );
}
