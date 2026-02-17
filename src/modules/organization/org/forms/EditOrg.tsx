import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams, useNationality } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { FETCH_ORG, EDIT_ORG } from '../graphql';
import { mapFormToOrg, mapOrgToForm } from '../helpers/mapOrgForm';
import DeleteOrg from './DeleteOrg';
import OrgForm from './OrgForm';
import type { OrganizationFormData } from './validation';

export default function EditOrg() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(FETCH_ORG, {
    variables: { orgId: orgId! },
  });
  const [updateOrganization, { loading: updateLoading, error: updateError }] = useMutation(
    EDIT_ORG,
    {
      refetchQueries: [{ query: FETCH_ORG, variables: { orgId: orgId! } }],
    }
  );
  const { nationalityOptions } = useNationality();
  const dispatch: AppDispatch = useDispatch();

  const defaultValues: OrganizationFormData | null = useMemo(
    () => (data?.org ? mapOrgToForm(data.org) : null),
    [data]
  );

  const onSubmit = (formData: OrganizationFormData) => {
    try {
      const mapped = mapFormToOrg(formData);
      updateOrganization({ variables: { orgId: orgId!, ...mapped } }).then(() => {
        refetch({ orgId: orgId! });
        dispatch(showAlert({ text: 'Organization updated!', type: 'success' }));
        navigate(`/org/${orgId!}`);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const renderContent = () => {
    return defaultValues ? (
      <>
        <OrgForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          countryOptions={nationalityOptions}
          loading={loading || updateLoading}
          error={error || updateError}
        />
        <DeleteOrg />
      </>
    ) : (
      <Spinner />
    );
  };
  return <PageHeader title={PAGES.EDIT}>{renderContent()}</PageHeader>;
}
