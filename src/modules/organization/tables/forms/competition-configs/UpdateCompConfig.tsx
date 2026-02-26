import { useMutation } from '@apollo/client/react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useCustomParams } from '../../../../../hooks';
import { AppDispatch, showAlert } from '../../../../../store';
import { FETCH_ORG_SEASON, FETCH_ORG_SEASONS } from '../../../org-seasons/graphql';
import type { CompetitionConfig } from '../../../org-seasons/helpers/mapOrgSeasonForm';
import {
  mapCompConfigToForm,
  mapFormToUpdateCompConfig,
} from '../../../org-seasons/helpers/mapUpdateCompConfigsForm';
import { FETCH_LEAGUE_TABLES, UPDATE_COMPETITION_CONFIGS } from '../../graphql';
import UpdateCompConfigForm from './UpdateCompConfigForm';
import type { UpdateCompConfigFormData } from './validation';

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

  const [updateCompConfigs, { error, loading }] = useMutation(UPDATE_COMPETITION_CONFIGS, {
    refetchQueries: [
      { query: FETCH_ORG_SEASONS, variables: { orgId: orgId! } },
      { query: FETCH_ORG_SEASON, variables: { seasonId: orgSeasonId! } },
      { query: FETCH_LEAGUE_TABLES, variables: { orgId: orgId!, seasonId: orgSeasonId! } },
    ],
  });

  const defaultValues: UpdateCompConfigFormData | null = useMemo(() => {
    if (!existingConfig) return null;
    return mapCompConfigToForm(existingConfig);
  }, [existingConfig]);

  const onSubmit = async (formData: UpdateCompConfigFormData) => {
    try {
      const variables = mapFormToUpdateCompConfig(formData, orgId!, orgSeasonId!, competitionId);
      return updateCompConfigs({ variables }).then(() => {
        dispatch(showAlert({ text: 'Season updated successfully', type: 'success' }));
      });
    } catch (error) {
      console.error(error);
      dispatch(showAlert({ text: 'There was a problem', type: 'error' }));
    }
  };

  return (
    <UpdateCompConfigForm
      defaultValues={defaultValues!}
      onSubmit={onSubmit}
      numberOfTeams={numberOfTeams}
      numberOfCompetitions={numberOfCompetitions}
      loading={loading}
      error={error}
    />
  );
}
