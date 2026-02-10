import { useMutation } from '@apollo/client/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '../../../../components';
import { useCustomParams, useNationality } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { FETCH_ORG_TEAMS } from '../../../organization/graphql';
import { FETCH_TEAMS_BY_USER } from '../../../profile/graphql';
import { PAGES, TeamError, TeamSuccess } from '../../constants';
import { ADD_TEAM } from '../../graphql';
import AddTeamView from './AddTeamView';
import { mapFormDataToMutationInput } from './state';
import type { TeamFormData } from './types';

export default function AddTeam() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const [addTeam, { error, loading }] = useMutation(ADD_TEAM, {
    refetchQueries: [
      {
        query: FETCH_ORG_TEAMS,
        variables: { orgId },
      },
      { query: FETCH_TEAMS_BY_USER },
    ],
  });

  const onSubmit = async (data: TeamFormData) => {
    try {
      await addTeam({ variables: { orgId: orgId!, ...mapFormDataToMutationInput({ ...data }) } });
      dispatch(
        showAlert({
          text: TeamSuccess.add,
          type: 'success',
        })
      );
      navigate(-1);
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          text: TeamError.add,
          type: 'error',
        })
      );
    }
  };

  return (
    <PageContainer title={PAGES.ADD_TEAM}>
      <AddTeamView
        error={error}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
        loading={loading}
      />
    </PageContainer>
  );
}
