import { useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_ORG_TEAMS } from '../../organization/graphql';
import { FETCH_TEAMS_BY_USER } from '../../profile/graphql';
import {
  initialTeamDetailsState,
  mapFormDataToMutationInput,
  TeamFormData,
} from '../forms/add-team/schema';
import { ADD_TEAM } from '../graphql';
import AddTeamPage from '../pages/AddTeamPage';

export default function AddTeam() {
  const { t } = useTranslation('team');
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [addTeam, { loading }] = useMutation(ADD_TEAM, {
    refetchQueries: [
      {
        query: FETCH_ORG_TEAMS,
        variables: { orgId },
      },
      { query: FETCH_TEAMS_BY_USER },
    ],
    onError: () => {
      dispatch(showAlert({ text: t('ALERTS.ADD_TEAM.ERROR'), type: 'error' }));
    },
  });

  const onSubmit = async (data: TeamFormData) => {
    try {
      await addTeam({ variables: { orgId: orgId!, ...mapFormDataToMutationInput({ ...data }) } });
      dispatch(
        showAlert({
          text: t('ALERTS.ADD_TEAM.SUCCESS'),
          type: 'success',
        })
      );
      navigate(-1);
    } catch (error) {
      console.error(error);
      dispatch(
        showAlert({
          text: t('ALERTS.ADD_TEAM.ERROR'),
          type: 'error',
        })
      );
    }
  };

  return (
    <AddTeamPage onSubmit={onSubmit} loading={loading} defaultValues={initialTeamDetailsState} />
  );
}
