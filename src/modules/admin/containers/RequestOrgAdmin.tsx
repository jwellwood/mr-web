import { useLazyQuery, useMutation } from '@apollo/client/react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useUpdateAuth } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { FETCH_ORGS_BY_SEARCH } from '../../home/graphql';
import RequestAdminModal from '../components/RequestAdminModal';
import { generateErrorMessage } from '../errors/generateErrorMessage';
import { REQUEST_ORG_ADMIN_ACCESS } from '../graphql';

export default function RequestOrgAdmin() {
  const { t } = useTranslation('admin');
  const dispatch: AppDispatch = useDispatch();
  const { updateAuth } = useUpdateAuth();

  const [fetchOrgs, { data, loading: searchLoading, error: searchError }] =
    useLazyQuery(FETCH_ORGS_BY_SEARCH);
  const [requestAdminAccess, { loading }] = useMutation(REQUEST_ORG_ADMIN_ACCESS);

  const results = data?.orgs.map(org => ({
    id: org._id,
    name: org.name,
    city: org.city,
    country: org.country,
    badge: org.badge?.url,
  }));

  const onSubmit = async (orgId: string, code: string) => {
    try {
      const res = await requestAdminAccess({ variables: { orgId, code } });
      const token = res.data?.REQUEST_ORG_ADMIN_ACCESS?.token;

      if (token) {
        await updateAuth(token);
      }
      dispatch(showAlert({ text: t('ALERTS.REQUEST_ADMIN.SUCCESS'), type: 'success' }));
      return true;
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: generateErrorMessage(error, t), type: 'error' }));
      return false;
    }
  };

  return (
    <RequestAdminModal
      type="org"
      results={results}
      searchLoading={searchLoading}
      searchError={searchError}
      submitLoading={loading}
      onSearch={filter => fetchOrgs({ variables: { filter } })}
      onSubmit={onSubmit}
    />
  );
}
