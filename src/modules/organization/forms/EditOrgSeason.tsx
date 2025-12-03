import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_ORG_SEASON, FETCH_ORG_SEASON, FETCH_ORG_SEASONS } from '../graphql';
import { PAGES } from '../constants.ts';
import { useCustomParams } from '../../../hooks/useCustomParams.tsx';
import { AppDispatch } from '../../../store/store.ts';
import { showAlert } from '../../../store/features/alerts/alertsSlice.ts';
import ErrorGraphql from '../../../errors/ErrorGraphql.tsx';
import RouteGuard from '../../../router/RouteGuard.tsx';
import { AuthRoles } from '../../../constants.ts';
import { Spinner } from '../../../components/loaders/index.ts';
import { PageHeader } from '../../../components/index.ts';
import { IOrgSeasonInput } from '../types.ts';
import OrgSeasonForm from './components/OrgSeasonForm.tsx';
import DeleteOrgSeason from '../containers/DeleteOrgSeason.tsx';

export default function EditOrgSeason() {
  const { orgId, orgSeasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<IOrgSeasonInput | null>(null);

  const { loading, error, data, refetch } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId },
    notifyOnNetworkStatusChange: true,
  });

  const [editOrgSeason, { error: editError, loading: editLoading }] = useMutation(EDIT_ORG_SEASON, {
    variables: { orgId, seasonId: orgSeasonId },
    refetchQueries: [{ query: FETCH_ORG_SEASONS, variables: { orgId } }],
  });

  useEffect(() => {
    if (data?.orgSeason) {
      const season = data.orgSeason;

      setDefaultValues({ ...season });
    }
  }, [data]);

  const onSubmit = async (formData: IOrgSeasonInput) => {
    try {
      return editOrgSeason({
        variables: { orgId, seasonId: orgSeasonId, ...formData },
      }).then(() => {
        refetch();
        dispatch(showAlert({ text: 'Season updated successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const hasError = error || editError;
  const isLoading = loading || editLoading;

  const renderContent = () => {
    return !isLoading && defaultValues ? (
      <>
        <OrgSeasonForm defaultValues={defaultValues} onSubmit={onSubmit} />
        <DeleteOrgSeason />
      </>
    ) : (
      <Spinner />
    );
  };

  return (
    <RouteGuard authorization={AuthRoles.ORG_ADMIN}>
      <PageHeader title={PAGES.EDIT_ORG_SEASON}>
        {hasError ? <ErrorGraphql error={(error || editError) as Error} /> : renderContent()}
      </PageHeader>
    </RouteGuard>
  );
}
