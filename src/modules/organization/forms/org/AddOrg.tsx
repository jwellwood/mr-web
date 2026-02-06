import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_ORG } from '../../graphql';
import { FETCH_USER, FETCH_ORGS_BY_USER } from '../../../profile/graphql';
import { PAGES } from '../../constants';
import { AppDispatch, showAlert } from '../../../../store';
import { useNationality } from '../../../../hooks';
import { Spinner } from '../../../../components/loaders';
import { initialOrgDetailsState } from './state';
import { PageHeader } from '../../../../components';
import type { OrganizationFormData } from './validation';
import OrgForm from './OrgForm';

export default function AddOrg() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const [defaultValues, setDefaultValues] = useState<OrganizationFormData | null>(null);

  const [addOrg, { error, loading }] = useMutation(ADD_ORG, {
    refetchQueries: [{ query: FETCH_USER }, { query: FETCH_ORGS_BY_USER }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialOrgDetailsState });
  }, []);

  const onSubmit = async (data: OrganizationFormData) => {
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
    return defaultValues ? (
      <OrgForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        countryOptions={nationalityOptions}
        loading={loading}
        error={error}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.ADD}>{renderContent()}</PageHeader>;
}
