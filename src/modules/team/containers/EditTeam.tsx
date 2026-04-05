import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_TEAMS_BY_USER } from '../../profile/graphql';
import { mapFormDataToMutationInput } from '../forms/add-team/schema';
import { mapTeamDataToFormData, type EditTeamFormData } from '../forms/edit-team/schema';
import { FETCH_TEAM, EDIT_TEAM } from '../graphql';
import EditTeamPage from '../pages/EditTeamPage';

export default function EditTeam() {
  const { t } = useTranslation('team');
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, data } = useQuery(FETCH_TEAM, {
    variables: { teamId: teamId! },
  });
  const [updateTeamDetails, { loading: updateLoading }] = useMutation(EDIT_TEAM, {
    refetchQueries: [
      { query: FETCH_TEAMS_BY_USER },
      { query: FETCH_TEAM, variables: { teamId: teamId! } },
    ],
    awaitRefetchQueries: true,
    onError: err => {
      console.error(err);
      dispatch(showAlert({ text: t('ALERTS.EDIT_TEAM.FAILURE'), type: 'error' }));
    },
  });

  const defaultValues: EditTeamFormData | null = useMemo(
    () => (data?.team ? mapTeamDataToFormData(data.team) : null),
    [data]
  );

  const onSubmit = (formData: EditTeamFormData) => {
    try {
      updateTeamDetails({
        variables: { teamId: teamId!, ...mapFormDataToMutationInput(formData) },
      }).then(() => {
        dispatch(
          showAlert({
            text: t('ALERTS.EDIT_TEAM.SUCCESS'),
            type: 'success',
          })
        );
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.EDIT_TEAM.FAILURE'), type: 'error' }));
    }
  };

  return (
    <EditTeamPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={loading || updateLoading}
      error={error}
    />
  );
}
