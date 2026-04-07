import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { useCompetitionOptions } from '../../competitions/hooks/useCompetitionOptions';
import { useTeamOptions } from '../../team/hooks';
import type { OrgSeasonFormData } from '../forms/schema';
import { EDIT_ORG_SEASON, FETCH_ORG_SEASON, FETCH_ORG_SEASONS } from '../graphql';
import { mapFormToEditOrgSeason, mapOrgSeasonToForm } from '../helpers/mapOrgSeasonForm';
import EditSeasonPage from '../pages/EditSeasonPage';

export default function EditOrgSeason() {
  const { t } = useTranslation('seasons');
  const { orgId, orgSeasonId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { teamOptions, loading: teamOptionsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionOptionsLoading } = useCompetitionOptions();

  const { loading, error, data } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId! },
  });

  const [editOrgSeason, { loading: editLoading }] = useMutation(EDIT_ORG_SEASON, {
    refetchQueries: [
      { query: FETCH_ORG_SEASONS, variables: { orgId: orgId! } },
      { query: FETCH_ORG_SEASON, variables: { seasonId: orgSeasonId! } },
    ],
    onError: () => dispatch(showAlert({ text: t('ALERTS.EDIT_SEASON.ERROR'), type: 'error' })),
  });

  const defaultValues: OrgSeasonFormData | null = useMemo(() => {
    if (!data?.orgSeason) return null;
    return mapOrgSeasonToForm(data.orgSeason);
  }, [data]);

  const onSubmit = async (formData: OrgSeasonFormData) => {
    try {
      const variables = mapFormToEditOrgSeason(formData, orgId!, orgSeasonId!);
      return editOrgSeason({ variables }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.EDIT_SEASON.SUCCESS'), type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.EDIT_SEASON.ERROR'), type: 'error' }));
    }
  };

  return (
    <EditSeasonPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={loading || editLoading || teamOptionsLoading || competitionOptionsLoading}
      error={error}
      teamOptions={teamOptions}
      competitionOptions={competitionOptions}
    />
  );
}
