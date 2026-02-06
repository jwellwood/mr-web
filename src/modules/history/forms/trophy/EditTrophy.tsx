import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_TROPHY, EDIT_TROPHY, FETCH_TROPHIES } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams, useSeasons } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import RouteGuard from '../../../../router/RouteGuard';
import { AUTH_ROLES } from '../../../../constants';
import { Spinner } from '../../../../components/loaders';
import { PageHeader } from '../../../../components';
import type { TrophyFormData } from './validation';
import TrophyForm from './TrophyForm';
import { mapTrophyToForm, mapFormToEditTrophyVariables } from '../../helpers/mapTrophyForm';
import DeleteTrophy from './DeleteTrophy';

export default function EditTrophy() {
  const { teamId, trophyId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { seasonOptions, loading: loadingSeasons } = useSeasons();
  const [defaultValues, setDefaultValues] = useState<TrophyFormData | null>(null);

  const { loading, error, data, refetch } = useQuery(FETCH_TROPHY, {
    variables: { trophyId: trophyId! },
    notifyOnNetworkStatusChange: true,
  });

  const [editTrophy, { error: editError, loading: editLoading }] = useMutation(EDIT_TROPHY, {
    refetchQueries: [{ query: FETCH_TROPHIES, variables: { teamId: teamId! } }],
  });

  useEffect(() => {
    if (data?.trophy && seasonOptions.length > 0) {
      setDefaultValues(mapTrophyToForm(data.trophy, seasonOptions));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.trophy, seasonOptions.length]);

  const onSubmit = async (formData: TrophyFormData) => {
    try {
      const variables = mapFormToEditTrophyVariables(formData);
      return editTrophy({ variables: { teamId: teamId!, trophyId: trophyId!, ...variables } }).then(
        () => {
          refetch();
          dispatch(showAlert({ text: 'Trophy updated successfully', type: 'success' }));
          navigate(-1);
        }
      );
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const isLoading = loading || editLoading || loadingSeasons;

  const renderContent = () => {
    return defaultValues ? (
      <>
        <TrophyForm
          defaultValues={defaultValues}
          seasonOptions={seasonOptions}
          onSubmit={onSubmit}
          loading={isLoading}
          error={error || editError}
        />
        <DeleteTrophy />
      </>
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
