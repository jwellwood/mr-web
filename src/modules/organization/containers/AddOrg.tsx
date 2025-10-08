import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_ORG } from '../graphql';
import { GET_ORGS_BY_USER_ID } from '../../profile/graphql/getOrgsByUserId.graphql.ts';
import { GET_USER } from '../../profile/graphql/getUser.graphql.ts';

import { PAGES } from '../constants';
import OrgForm from '../forms/OrgForm';
import { AppDispatch } from '../../../store/store.ts';
import { useNationality } from '../../../hooks';
import { IOrganization } from '../../../types';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders';
import { initialOrgDetailsState } from '../forms/state.ts';
import CustomAppBar from '../../../components/navigation/CustomAppBar.tsx';

export default function AddOrg() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const [defaultValues, setDefaultValues] = useState<Partial<IOrganization>>({});

  const [addOrg, { error, loading }] = useMutation(ADD_ORG, {
    refetchQueries: [{ query: GET_USER }, { query: GET_ORGS_BY_USER_ID }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialOrgDetailsState });
  }, []);

  const onSubmit = async (data: Partial<IOrganization>) => {
    try {
      return addOrg({ variables: { ...data } }).then(res => {
        dispatch(showAlert({ text: 'Organization added successfully!', type: 'success' }));
        navigate(`/org/${res?.data?.org._id}`);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  const renderContent = () => {
    return !loading && defaultValues ? (
      <OrgForm
        defaultValues={defaultValues}
        onSubmit={e => {
          onSubmit(e);
        }}
        countryOptions={nationalityOptions}
      />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.USER}>
      <CustomAppBar title={PAGES.ADD}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </CustomAppBar>
    </RouteGuard>
  );
}
