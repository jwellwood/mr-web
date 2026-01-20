import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_TEAM, EDIT_TEAM } from '../../graphql';
import { PAGES, TeamError, TeamSuccess } from '../../constants';
import { useCustomParams, useNationality } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { AUTH_ROLES } from '../../../../constants';
import { PageContainer } from '../../../../components';
import type { EditTeamFormData } from './validation';
import EditTeamView from './EditTeamView';

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
  const [defaultValues, setDefaultValues] = useState<EditTeamFormData | null>(null);

  useEffect(() => {
    if (data) {
      const { team } = data;
      setDefaultValues({ ...team, yearFounded: new Date(team.yearFounded) });
    }
  }, [data]);

  const onSubmit = (formData: EditTeamFormData) => {
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

  return (
    <PageContainer auth={AUTH_ROLES.TEAM_ADMIN} title={PAGES.EDIT_TEAM}>
      <EditTeamView
        loading={loading || updateLoading}
        error={error || updateError}
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
      />
    </PageContainer>
  );
}
