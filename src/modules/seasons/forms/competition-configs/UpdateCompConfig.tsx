import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { FETCH_LEAGUE_TABLES } from '../../../results/graphql';
import { FETCH_ORG_SEASON, FETCH_ORG_SEASONS } from '../../graphql';
import { UPDATE_COMPETITION_CONFIGS } from '../../graphql';
import type { CompetitionConfig } from '../../helpers/mapOrgSeasonForm';
import {
  mapCompConfigToForm,
  mapFormToUpdateCompConfig,
} from '../../helpers/mapUpdateCompConfigsForm';
import type { UpdateCompConfigFormData } from './schema';
import UpdateCompConfigForm from './UpdateCompConfigForm';

interface Props {
  competitionId: string;
  existingConfig?: CompetitionConfig;
  numberOfTeams: number;
  numberOfCompetitions: number;
}

export default function UpdateCompConfig({
  competitionId,
  existingConfig,
  numberOfTeams,
  numberOfCompetitions,
}: Props) {
  const { orgId, orgSeasonId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation('seasons');

  const [updateCompConfigs, { loading }] = useMutation(UPDATE_COMPETITION_CONFIGS, {
    refetchQueries: [
      { query: FETCH_ORG_SEASONS, variables: { orgId: orgId! } },
      { query: FETCH_ORG_SEASON, variables: { seasonId: orgSeasonId! } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId: orgId!, orgSeasonId: orgSeasonId! } },
    ],
    onError: err => dispatch(showAlert({ text: err.message, type: 'error' })),
  });

  const defaultValues: UpdateCompConfigFormData | null = useMemo(() => {
    if (!existingConfig) return null;
    return mapCompConfigToForm(existingConfig);
  }, [existingConfig]);

  const onSubmit = async (formData: UpdateCompConfigFormData) => {
    try {
      const variables = mapFormToUpdateCompConfig(formData, orgId!, orgSeasonId!, competitionId);
      return updateCompConfigs({ variables }).then(() => {
        dispatch(showAlert({ text: t('ALERTS.UPDATE_COMP_CONFIG.SUCCESS'), type: 'success' }));
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: t('ALERTS.UPDATE_COMP_CONFIG.ERROR'), type: 'error' }));
    }
  };

  return (
    <UpdateCompConfigForm
      defaultValues={defaultValues!}
      onSubmit={onSubmit}
      numberOfTeams={numberOfTeams}
      numberOfCompetitions={numberOfCompetitions}
      loading={loading}
    />
  );
}
