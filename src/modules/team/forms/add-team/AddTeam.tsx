import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TEAM } from '../../graphql';
import { FETCH_ORG_TEAMS } from '../../../organization/graphql';
import { FETCH_TEAMS_BY_USER } from '../../../profile/graphql';
import { PAGES, TeamError, TeamSuccess } from '../../constants';
import { useCustomParams, useNationality } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { AUTH_ROLES } from '../../../../constants';
import { PageContainer } from '../../../../components';
import type { TeamFormData } from './validation';
import AddTeamView from './AddTeamView';

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

  const onSubmit = async (data: Partial<TeamFormData>) => {
    try {
      return addTeam({ variables: { orgId, ...data } }).then(() => {
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
      dispatch(
        showAlert({
          text: TeamError.edit,
          type: 'error',
        })
      );
    }
  };

  return (
    <PageContainer auth={AUTH_ROLES.USER} title={PAGES.ADD_TEAM}>
      <AddTeamView
        error={error}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
        loading={loading}
      />
    </PageContainer>
  );
}
