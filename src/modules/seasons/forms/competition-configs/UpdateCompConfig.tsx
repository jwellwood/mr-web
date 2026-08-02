import { useMutation, useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { ISelectOptions } from '../../../../components';
import { useCustomParams } from '../../../../hooks';
import { AppDispatch, showAlert } from '../../../../store';
import { FETCH_COMPETITIONS } from '../../../competitions/graphql';
import { FETCH_LEAGUE_TABLES } from '../../../results/graphql';
import { FETCH_ORG_SEASON, FETCH_ORG_SEASONS } from '../../graphql';
import { UPDATE_COMPETITION_CONFIGS } from '../../graphql';
import type { CompetitionConfig } from '../../helpers/mapOrgSeasonForm';
import {
  mapCompConfigToInput,
  mapCompConfigToForm,
  mapFormToCompConfigInput,
} from '../../helpers/mapUpdateCompConfigsForm';
import type { UpdateCompConfigFormData } from './schema';
import UpdateCompConfigForm from './UpdateCompConfigForm';

interface Props {
  competitionId: string;
  existingConfig?: CompetitionConfig;
  numberOfTeams: number;
  numberOfCompetitions: number;
  seasonTeamIds: Array<{ _id: string; teamName: string }>;
  seasonCompetitionConfigs: CompetitionConfig[];
}

export default function UpdateCompConfig({
  competitionId,
  existingConfig,
  numberOfTeams,
  numberOfCompetitions,
  seasonTeamIds,
  seasonCompetitionConfigs,
}: Props) {
  const { orgId, orgSeasonId } = useCustomParams();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation('seasons');

  const { data: competitionsData } = useQuery(FETCH_COMPETITIONS, {
    variables: { orgId: orgId! },
  });

  const competitionType = competitionsData?.org?.competitions?.find(
    c => c._id === competitionId
  )?.competitionType;
  const competitionTypeById = new Map(
    competitionsData?.org?.competitions?.map(comp => [comp._id, comp.competitionType]) ?? []
  );

  const teamOptions = useMemo<ISelectOptions[]>(
    () =>
      seasonTeamIds.map(team => ({
        value: team._id,
        label: team.teamName,
      })),
    [seasonTeamIds]
  );

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
    return mapCompConfigToForm(existingConfig, competitionType);
  }, [existingConfig, competitionType]);

  const onSubmit = async (formData: UpdateCompConfigFormData) => {
    try {
      const competitionConfigs = seasonCompetitionConfigs.map(config => {
        if (config.competitionId._id === competitionId) {
          return mapFormToCompConfigInput(formData, competitionId, competitionType);
        }

        return mapCompConfigToInput(
          config,
          competitionTypeById.get(config.competitionId._id) || undefined
        );
      });

      const variables = {
        orgId: orgId!,
        seasonId: orgSeasonId!,
        competitionConfigs,
      };

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
      competitionType={competitionType}
      teamOptions={teamOptions}
    />
  );
}
