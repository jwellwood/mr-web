import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useNationality } from 'hooks';
import { useCustomParams } from 'hooks/useCustomParams';
import { showAlert } from 'modules/alerts';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { IOrganization } from 'types';
import { PAGES } from '../constants';
import OrgForm from '../forms/OrgForm';
import { GET_ORG, UPDATE_ORG } from '../graphql';

const UpdateDetailsContainer: React.FC = () => {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_ORG, {
    variables: { orgId },
    notifyOnNetworkStatusChange: true,
  });
  const [updateOrganization, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_ORG);
  const { nationalityOptions } = useNationality();
  const dispatch: AppDispatch = useDispatch();
  const [defaultValues, setDefaultValues] = useState<IOrganization>(null);

  useEffect(() => {
    if (data) {
      const { org } = data;
      setDefaultValues({
        ...(org as IOrganization),
      });
    }
  }, [data]);

  const onSubmit = (formData: IOrganization) => {
    try {
      updateOrganization({ variables: { orgId: orgId, ...formData } }).then(
        () => {
          refetch({ orgId });
          dispatch(showAlert('Organization updated!', 'success'));
          navigate(`/org/${orgId}`);
        }
      );
    } catch (error) {
      dispatch(showAlert('There was a problem', 'error'));
    }
  };

  if (error || updateError)
    return <ErrorGraphql error={[error, updateError]} />;
  return (
    <RouteGuard authorization={AUTH_ROLES.ORG_ADMIN} orgId={orgId}>
      <PageHeader title={PAGES.EDIT} />
      {!loading && !updateLoading && defaultValues ? (
        <OrgForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          countryOptions={nationalityOptions}
        />
      ) : (
        <Spinner />
      )}
    </RouteGuard>
  );
};

export default UpdateDetailsContainer;
