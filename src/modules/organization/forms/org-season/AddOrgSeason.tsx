import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_ORG_SEASON, FETCH_ORG_SEASONS } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams } from '../../../../hooks/useCustomParams';
import { AppDispatch, showAlert } from '../../../../store';
import Spinner from '../../../../components/loaders/Spinner';
import { PageHeader } from '../../../../components';
import { initialOrgSeasonState } from './state';
import type { OrgSeasonFormData } from './validation';
import OrgSeasonForm from './OrgSeasonForm';

export default function AddOrgSeason() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<OrgSeasonFormData | null>(null);

  const [addOrgSeason, { error, loading }] = useMutation(ADD_ORG_SEASON, {
    refetchQueries: [{ query: FETCH_ORG_SEASONS, variables: { orgId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialOrgSeasonState });
  }, []);

  const onSubmit = async (formData: OrgSeasonFormData) => {
    try {
      return addOrgSeason({
        variables: { orgId, ...formData },
      }).then(() => {
        dispatch(showAlert({ text: 'Season added successfully!', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'Something went wrong', type: 'error' }));
    }
  };

  const renderContent = () => {
    return defaultValues ? (
      <OrgSeasonForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
      />
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.ADD_ORG_SEASON}>{renderContent()}</PageHeader>;
}
