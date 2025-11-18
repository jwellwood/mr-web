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
import { Spinner } from '../../../components/loaders';
import { PageHeader } from '../../../components';
import OrgSeasonForm from '../forms/OrgSeasonForm.tsx';
import { IOrgSeasonInput } from '../types.ts';

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

  // const [deleteAward, { error: deleteError, loading: deleteLoading }] = useMutation(DELETE_AWARD, {
  //   refetchQueries: [{ query: FETCH_ORG_SEASONS, variables: { orgId } }],
  // });

  useEffect(() => {
    if (data?.orgSeason) {
      const season = data.orgSeason;

      setDefaultValues({ ...season });
    }
  }, [data]);

  // const onDelete = async () => {
  //   try {
  //     return deleteAward({ variables: { teamId, awardId } }).then(() => {
  //       dispatch(showAlert({ text: 'Award deleted successfully', type: 'success' }));
  //       navigate(-2);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
  //   }
  // };

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
      <OrgSeasonForm
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        // onDelete={onDelete}
        // deleteLoading={deleteLoading}
      />
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
