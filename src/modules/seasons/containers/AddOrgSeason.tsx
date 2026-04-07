import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useCustomParams } from '../../../hooks';
import { AppDispatch, showAlert } from '../../../store';
import { useCompetitionOptions } from '../../competitions/hooks/useCompetitionOptions';
import { useTeamOptions } from '../../team/hooks';
import { initialOrgSeasonState, type OrgSeasonFormData } from '../forms/schema';
import { ADD_ORG_SEASON, FETCH_ORG_SEASONS } from '../graphql';
import { mapFormToAddOrgSeason } from '../helpers/mapOrgSeasonForm';
import AddSeasonPage from '../pages/AddSeasonPage';

export default function AddOrgSeason() {
  const { t } = useTranslation('seasons');
  const { orgId } = useCustomParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { teamOptions, loading: teamOptionsLoading } = useTeamOptions();
  const { competitionOptions, loading: competitionOptionsLoading } = useCompetitionOptions();
  const defaultValues: OrgSeasonFormData = useMemo(() => ({ ...initialOrgSeasonState }), []);

  const [addOrgSeason, { loading }] = useMutation(ADD_ORG_SEASON, {
    refetchQueries: [{ query: FETCH_ORG_SEASONS, variables: { orgId } }],
    onError: () => dispatch(showAlert({ text: t('ALERTS.ADD_SEASON.ERROR'), type: 'error' })),
  });

  const onSubmit = async (formData: OrgSeasonFormData) => {
    try {
      const variables = mapFormToAddOrgSeason(formData, orgId!);
      return addOrgSeason({ variables }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.ADD_SEASON.SUCCESS'), type: 'success' }));
        navigate(-1);
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.ADD_SEASON.ERROR'), type: 'error' }));
    }
  };

  return (
    <AddSeasonPage
      onSubmit={onSubmit}
      defaultValues={defaultValues}
      loading={loading || teamOptionsLoading || competitionOptionsLoading}
      teamOptions={teamOptions}
      competitionOptions={competitionOptions}
    />
  );
}
