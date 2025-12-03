import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_ORG_SEASON, FETCH_ORG_SEASONS } from '../graphql';
import { AuthRoles } from '../../../constants.ts';
import { PAGES } from '../constants.ts';
import { initialOrgSeasonState } from './state.ts';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import { AppDispatch } from '../../../store/store.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import Spinner from '../../../components/loaders/Spinner.tsx';
import { IOrgSeasonInput } from '../types.ts';
import { PageHeader } from '../../../components/index.ts';
import OrgSeasonForm from './components/OrgSeasonForm.tsx';

export default function AddOrgSeason() {
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<IOrgSeasonInput | null>(null);

  const [addOrgSeason, { error, loading }] = useMutation(ADD_ORG_SEASON, {
    refetchQueries: [{ query: FETCH_ORG_SEASONS, variables: { orgId } }],
  });

  useEffect(() => {
    setDefaultValues({ ...initialOrgSeasonState });
  }, []);
  const onSubmit = async (formData: IOrgSeasonInput) => {
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
    return !loading && defaultValues ? (
      <OrgSeasonForm defaultValues={defaultValues} onSubmit={onSubmit} />
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.ORG_ADMIN}>
      <PageHeader title={PAGES.ADD_ORG_SEASON}>
        {error ? <ErrorGraphql error={error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
