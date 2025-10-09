import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_ORG } from '../graphql';
import { FETCH_USER, FETCH_ORGS_BY_USER } from '../../profile/graphql';

import { PAGES } from '../constants';
import OrgForm from '../forms/OrgForm';
import { AppDispatch } from '../../../store/store.ts';
import { useNationality } from '../../../hooks';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders';
import { initialOrgDetailsState } from '../forms/state.ts';
import CustomAppBar from '../../../components/navigation/CustomAppBar.tsx';
import { IOrganizationInput } from '../types.ts';

export default function AddOrg() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const [defaultValues, setDefaultValues] = useState<IOrganizationInput | null>(null);

  const [addOrg, { error, loading }] = useMutation(ADD_ORG, {
    refetchQueries: [{ query: FETCH_USER }, { query: FETCH_ORGS_BY_USER }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialOrgDetailsState });
  }, []);

  const onSubmit = async (data: IOrganizationInput) => {
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
