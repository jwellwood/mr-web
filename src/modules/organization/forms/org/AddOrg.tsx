import { useMutation } from '@apollo/client';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useNationality } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { FETCH_USER, FETCH_ORGS_BY_USER } from '../../../profile/graphql';
import { PAGES } from '../../constants';
import { ADD_ORG } from '../../graphql';
import OrgForm from './OrgForm';
import { initialOrgDetailsState } from './state';
import type { OrganizationFormData } from './validation';

export default function AddOrg() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { nationalityOptions } = useNationality();

  const defaultValues: OrganizationFormData = useMemo(() => ({ ...initialOrgDetailsState }), []);

  const [addOrg, { error, loading }] = useMutation(ADD_ORG, {
    refetchQueries: [{ query: FETCH_USER }, { query: FETCH_ORGS_BY_USER }],
  });

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
