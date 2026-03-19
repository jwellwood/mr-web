import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams, useNationality } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { FETCH_TEAMS_BY_USER } from '../../../profile/graphql';
import { PAGES, TeamError, TeamSuccess } from '../../constants';
import { FETCH_TEAM, EDIT_TEAM } from '../../graphql';
import DeleteTeam from '../delete-team/DeleteTeam';
import EditTeamForm from './EditTeamForm';
import { mapFormDataToMutationInput, mapTeamDataToFormData } from './state';
import type { EditTeamFormData } from './types';

export default function EditTeam() {
  const { teamId } = useCustomParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(FETCH_TEAM, {
    variables: { teamId: teamId! },
  });
  const [updateTeamDetails, { loading: updateLoading, error: updateError }] = useMutation(
    EDIT_TEAM,
    {
      refetchQueries: [{ query: FETCH_TEAMS_BY_USER }],
      awaitRefetchQueries: true,
    }
  );
  const { nationalityOptions } = useNationality();
  const dispatch: AppDispatch = useDispatch();

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
    <PageContainer title={PAGES.EDIT_TEAM}>
      {defaultValues ? (
        <>
          <EditTeamForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            countryOptions={nationalityOptions}
            loading={loading || updateLoading}
            error={error || updateError}
          />
          <DeleteTeam />
        </>
      ) : (
        <Spinner />
      )}
    </PageContainer>
  );
}
