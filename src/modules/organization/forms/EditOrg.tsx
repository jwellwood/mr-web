import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_ORG, EDIT_ORG } from '../graphql/index.ts';

import { PAGES } from '../constants.ts';
import OrgForm from './components/OrgForm.tsx';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { useNationality } from '../../../hooks/index.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../app/constants.ts';
import { Spinner } from '../../../components/loaders/index.ts';
import { IOrganizationInput } from '../types.ts';
import { PageHeader } from '../../../components/index.ts';
import DeleteOrg from '../containers/DeleteOrg.tsx';

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
  const [defaultValues, setDefaultValues] = useState<IOrganizationInput | null>(null);

  useEffect(() => {
    if (data) {
      const { org } = data;
      setDefaultValues({
        ...(org as IOrganizationInput),
      });
    }
  }, [data]);

  const onSubmit = (formData: IOrganizationInput) => {
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
    return !loading && !updateLoading && defaultValues ? (
      <>
        <OrgForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          countryOptions={nationalityOptions}
        />
        <DeleteOrg />
      </>
    ) : (
      <Spinner />
    );
  };
  return (
    <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
      <PageHeader title={PAGES.EDIT}>
        {error || updateError ? (
          <ErrorGraphql error={(error || updateError) as Error} />
        ) : (
          renderContent()
        )}
      </PageHeader>
    </RouteGuard>
  );
}
