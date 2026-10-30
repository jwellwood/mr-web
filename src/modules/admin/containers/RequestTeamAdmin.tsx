import { useLazyQuery, useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useUpdateAuth } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_TEAMS_BY_SEARCH } from '../../home/graphql';
import RequestAdminModal from '../components/RequestAdminModal';
import { REQUEST_TEAM_ADMIN_ACCESS } from '../graphql';

export default function RequestTeamAdmin() {
  const { t } = useTranslation('admin');
  const dispatch: AppDispatch = useDispatch();
  const { updateAuth } = useUpdateAuth();

  const [fetchTeams, { data, loading: searchLoading, error: searchError }] =
    useLazyQuery(FETCH_TEAMS_BY_SEARCH);
  const [requestAdminAccess, { loading }] = useMutation(REQUEST_TEAM_ADMIN_ACCESS);

  const results = data?.teams.map(team => ({
    id: team._id,
    name: team.teamName,
    city: team.location,
    country: team.country,
    badge: team.teamBadge?.url,
  }));

  const onSubmit = async (teamId: string, code: string) => {
    try {
      const res = await requestAdminAccess({ variables: { teamId, code } });
      const token = res.data?.REQUEST_TEAM_ADMIN_ACCESS?.token;

      if (token) {
        await updateAuth(token);
      }
      dispatch(showAlert({ text: t('ALERTS.REQUEST_ADMIN.SUCCESS'), type: 'success' }));
      return true;
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.REQUEST_ADMIN.ERROR'), type: 'error' }));
      return false;
    }
  };

  return (
    <RequestAdminModal
      type="team"
      results={results}
      searchLoading={searchLoading}
      searchError={searchError}
      submitLoading={loading}
      onSearch={filter => fetchTeams({ variables: { filter } })}
      onSubmit={onSubmit}
    />
  );
}
