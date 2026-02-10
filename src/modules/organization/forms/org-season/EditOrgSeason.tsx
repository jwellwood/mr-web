import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { EDIT_ORG_SEASON, FETCH_ORG_SEASON, FETCH_ORG_SEASONS } from '../../graphql';
import DeleteOrgSeason from './DeleteOrgSeason';
import OrgSeasonForm from './OrgSeasonForm';
import type { OrgSeasonFormData } from './validation';

export default function EditOrgSeason() {
  const { orgId, orgSeasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const { loading, error, data, refetch } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId },
  });

  const [editOrgSeason, { error: editError, loading: editLoading }] = useMutation(EDIT_ORG_SEASON, {
    variables: { orgId, seasonId: orgSeasonId },
    refetchQueries: [{ query: FETCH_ORG_SEASONS, variables: { orgId } }],
  });

  const defaultValues: OrgSeasonFormData | null = useMemo(() => {
    if (!data?.orgSeason) return null;
    const season = data.orgSeason;
    return {
      ...season,
      yearStarted: new Date(season.yearStarted),
      yearEnded: new Date(season.yearEnded),
    } as OrgSeasonFormData;
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
