import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { AUTH_ROLES } from 'app/constants';
import { Spinner } from 'components/loaders';
import { PageHeader } from 'components/typography';
import ErrorGraphql from 'errors/ErrorGraphql';
import { useNationality } from 'hooks';
import { showAlert } from 'modules/alerts';
import { GET_USER } from 'modules/profile/graphql';
import { AppDispatch } from 'reduxStore/rootReducer';
import RouteGuard from 'router/RouteGuard';
import { IOrganization } from 'types';
import { PAGES, initialOrgDetailsState } from '../constants';
import OrgForm from '../forms/OrgForm';
import { ADD_ORG } from '../graphql';

const AddOrg: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const [defaultValues, setDefaultValues] =
    useState<Partial<IOrganization>>(null);

  const [addOrg, { error, loading }] = useMutation(ADD_ORG, {
    refetchQueries: [{ query: GET_USER }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialOrgDetailsState });
  }, []);

  const onSubmit = async (data: Partial<IOrganization>) => {
    try {
      return addOrg({ variables: { ...data } }).then((res) => {
        dispatch(showAlert('Organization added successfully!', 'success'));
        navigate(`/org/${res.data.org._id}`);
      });
    } catch (error) {
      dispatch(showAlert('Something went wrong', 'error'));
    }
  };

  if (error) return <ErrorGraphql error={[error.message]} />;

  return (
    <RouteGuard authorization={AUTH_ROLES.USER}>
      <PageHeader title={PAGES.ADD} />
      {!loading && defaultValues ? (
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

export default AddOrg;
