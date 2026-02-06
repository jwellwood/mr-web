import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_ORG, EDIT_ORG } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams, useNationality } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { Spinner } from '../../../../components/loaders';
import type { OrganizationFormData } from './validation';
import { PageHeader } from '../../../../components';
import OrgForm from './OrgForm';
import DeleteOrg from './DeleteOrg';

export default function EditOrg() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(FETCH_ORG, {
    variables: { orgId },
    notifyOnNetworkStatusChange: true,
  });
  const [updateOrganization, { loading: updateLoading, error: updateError }] =
    useMutation(EDIT_ORG);
  const { nationalityOptions } = useNationality();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<OrganizationFormData | null>(null);

  useEffect(() => {
    if (data) {
      const { org } = data;
      setDefaultValues({ ...org } as OrganizationFormData);
    }
  }, [data]);

  const onSubmit = (formData: OrganizationFormData) => {
    try {
      updateOrganization({ variables: { orgId: orgId, ...formData } }).then(() => {
        refetch({ orgId });
        dispatch(showAlert({ text: 'Organization updated!', type: 'success' }));
        navigate(`/org/${orgId}`);
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
