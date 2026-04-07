import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import type { OrganizationFormData } from '../forms/org-form/schema';
import { EDIT_ORG, FETCH_ORG } from '../graphql';
import { mapFormToOrg, mapOrgToForm } from '../helpers/mapOrgForm';
import EditOrgPage from '../pages/EditOrgPage';

export default function EditOrg() {
  const { t } = useTranslation('organization');
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, data, refetch } = useQuery(FETCH_ORG, {
    variables: { orgId: orgId! },
  });
  const [updateOrganization, { loading: updateLoading }] = useMutation(EDIT_ORG, {
    refetchQueries: [{ query: FETCH_ORG, variables: { orgId: orgId! } }],
    onError: err => {
      console.error(err);
      dispatch(showAlert({ text: t('ALERTS.EDIT.ERROR'), type: 'error' }));
    },
  });

  const defaultValues: OrganizationFormData | null = useMemo(
    () => (data?.org ? mapOrgToForm(data.org) : null),
    [data]
  );

  const onSubmit = (formData: OrganizationFormData) => {
    try {
      const mapped = mapFormToOrg(formData);
      updateOrganization({ variables: { orgId: orgId!, ...mapped } }).then(() => {
        refetch({ orgId: orgId! });
        dispatch(showAlert({ text: t('ALERTS.EDIT.SUCCESS'), type: 'success' }));
        navigate(`/org/${orgId!}`);
      });
    } catch (err) {
      console.error(err);
      dispatch(showAlert({ text: t('ALERTS.EDIT.ERROR'), type: 'error' }));
    }
  };

  return (
    <EditOrgPage
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      loading={loading || updateLoading}
      error={error}
    />
  );
}
