import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../../../components';
import { Spinner } from '../../../../components/loaders';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { PAGES } from '../../constants';
import { useCompetitionOptions, useTeamOptions } from '../../hooks';
import { EDIT_ORG_SEASON, FETCH_ORG_SEASON, FETCH_ORG_SEASONS } from '../graphql';
import { mapOrgSeasonToForm, mapFormToEditOrgSeason } from '../helpers/mapOrgSeasonForm';
import DeleteOrgSeason from './DeleteOrgSeason';
import OrgSeasonForm from './OrgSeasonForm';
import type { OrgSeasonFormData } from './validation';

export default function EditOrgSeason() {
  const { orgId, orgSeasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { teamOptions, loading: teamOptionsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionOptionsLoading } = useCompetitionOptions();

  const { loading, error, data } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId! },
  });

  const [editOrgSeason, { error: editError, loading: editLoading }] = useMutation(EDIT_ORG_SEASON, {
    variables: { orgId, seasonId: orgSeasonId! },
    refetchQueries: [
      { query: FETCH_ORG_SEASONS, variables: { orgId: orgId! } },
      { query: FETCH_ORG_SEASON, variables: { seasonId: orgSeasonId! } },
    ],
  });

  const defaultValues: OrgSeasonFormData | null = useMemo(() => {
    if (!data?.orgSeason) return null;
    return mapOrgSeasonToForm(data.orgSeason);
  }, [data]);

  const onSubmit = async (formData: OrgSeasonFormData) => {
    try {
      const variables = mapFormToEditOrgSeason(formData, orgId!, orgSeasonId!);
      return editOrgSeason({ variables }).then(() => {
        dispatch(showAlert({ text: 'Season updated successfully', type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  const isLoading = loading || editLoading || teamOptionsLoading || competitionOptionsLoading;

  const renderContent = () => {
    return defaultValues ? (
      <>
        <OrgSeasonForm
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          loading={isLoading}
          error={error || editError}
          teamOptions={teamOptions}
          competitionOptions={competitionOptions}
        />
        <DeleteOrgSeason />
      </>
    ) : (
      <Spinner />
    );
  };

  return <PageHeader title={PAGES.EDIT_ORG_SEASON}>{renderContent()}</PageHeader>;
}
