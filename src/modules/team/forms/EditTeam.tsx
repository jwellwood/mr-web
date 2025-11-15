import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_TEAM, EDIT_TEAM } from '../graphql';
import { PAGES, TeamError, TeamSuccess } from '../constants.ts';
import EditTeamForm from './components/EditTeamForm.tsx';
import { ITeamDetailsInput } from '../types';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { useNationality } from '../../../hooks';
import { AppDispatch } from '../../../store/store.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders';
import { PageHeader } from '../../../components';

export default function EditTeam() {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(FETCH_TEAM, {
    variables: { teamId },
    notifyOnNetworkStatusChange: true,
  });
  const [updateTeamDetails, { loading: updateLoading, error: updateError }] =
    useMutation(EDIT_TEAM);
  const { nationalityOptions } = useNationality();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<ITeamDetailsInput | null>(null);

  useEffect(() => {
    if (data) {
      const { team } = data;
      setDefaultValues({
        ...(team as ITeamDetailsInput),
      });
    }
  }, [data]);

  const onSubmit = (formData: Partial<ITeamDetailsInput>) => {
    try {
      updateTeamDetails({ variables: { teamId, ...formData } }).then(() => {
        refetch({ teamId });
        dispatch(
          showAlert({
            text: TeamSuccess.edit,
            type: 'success',
          })
        );
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: TeamError.edit, type: 'error' }));
    }
  };

  const renderContent = () => {
    return !loading && !updateLoading && defaultValues ? (
      <EditTeamForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.TEAM_ADMIN}>
      <PageHeader title={PAGES.EDIT_TEAM}>
        {error || updateError ? (
          <ErrorGraphql error={error || (updateError as Error)} />
        ) : (
          renderContent()
        )}
      </PageHeader>
    </RouteGuard>
  );
}
