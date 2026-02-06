import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_ORG_SEASON, FETCH_ORG_SEASON, FETCH_ORG_SEASONS } from '../../graphql';
import { PAGES } from '../../constants';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { Spinner } from '../../../../components/loaders';
import { PageHeader } from '../../../../components';
import type { OrgSeasonFormData } from './validation';
import OrgSeasonForm from './OrgSeasonForm';
import DeleteOrgSeason from './DeleteOrgSeason';

export default function EditOrgSeason() {
  const { orgId, orgSeasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const [defaultValues, setDefaultValues] = useState<OrgSeasonFormData | null>(null);

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

      setDefaultValues({
        ...season,
        yearStarted: new Date(season.yearStarted),
        yearEnded: new Date(season.yearEnded),
      });
    }
  }, [data]);

  const onSubmit = async (formData: OrgSeasonFormData) => {
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

  const isLoading = loading || editLoading;

  const renderContent = () => {
    return defaultValues ? (
      <>
        <OrgSeasonForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={isLoading}
          error={error || editError}
        />
        <DeleteOrgSeason />
      </>
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.EDIT_ORG_SEASON}>{renderContent()}</PageHeader>;
}
