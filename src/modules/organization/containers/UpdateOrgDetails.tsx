import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { FETCH_ORG, EDIT_ORG } from '../graphql';

import { PAGES } from '../constants';
import OrgForm from '../forms/OrgForm';
import { useCustomParams } from '../../../hooks/useCustomParams';
import { AppDispatch } from '../../../store/store';
import { useNationality } from '../../../hooks';
import { IOrganization } from '../../../types';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AUTH_ROLES } from '../../../app/constants.ts';
import { Spinner } from '../../../components/loaders';
import CustomAppBar from '../../../components/navigation/CustomAppBar.tsx';

export default function UpdateDetailsContainer() {
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
  const [defaultValues, setDefaultValues] = useState<IOrganization | null>(null);

  useEffect(() => {
    if (data) {
      const { org } = data;
      setDefaultValues({
        ...(org as IOrganization),
      });
    }
  }, [data]);

  const onSubmit = (formData: Partial<IOrganization>) => {
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
      <OrgForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
      />
    ) : (
      <Spinner />
    );
  };
  return (
    <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN}>
      <CustomAppBar title={PAGES.EDIT}>
        {error || updateError ? (
          <ErrorGraphql error={(error || updateError) as Error} />
        ) : (
          renderContent()
        )}
      </CustomAppBar>
    </RouteGuard>
  );
}
