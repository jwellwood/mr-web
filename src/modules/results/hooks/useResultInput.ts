import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ISelectOptions } from '../../../components';
import { useCustomParams } from '../../../hooks';
import { getNumberOptions } from '../../../utils';
import { FETCH_ORG_SEASON } from '../../seasons/graphql';
import { getCupRoundLabel } from '../helpers/getCupRoundLabel';

export const useTeamOptions = () => {
  const { t } = useTranslation('results');
  const { orgSeasonId, orgId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_SEASON, {
    variables: { orgId: orgId!, seasonId: orgSeasonId! },
  });

  const teamOptions = useMemo<ISelectOptions[]>(() => {
    if (!data?.orgSeason.teamIds?.length) return [];
    return data.orgSeason.teamIds
      .map(team => ({
        value: team._id,
        label: team.teamName,
      }))
      .sort((a, b) => a.label.localeCompare(b.label)) as ISelectOptions[];
  }, [data]);

  const competitionTeamMap = useMemo<Map<string, ISelectOptions[]>>(() => {
    const map = new Map<string, ISelectOptions[]>();
    data?.orgSeason?.competitionConfigs?.forEach(config => {
      if (config.teams && config.teams.length > 0) {
        map.set(
          config.competitionId._id,
          config.teams
            .map(t => ({ value: t.teamId._id, label: t.teamId.teamName }))
            .sort((a, b) => a.label.localeCompare(b.label))
        );
      }
    });
    return map;
  }, [data]);

  const roundOptions = useMemo<ISelectOptions[]>(() => {
    if (!data?.orgSeason?.competitionConfigs?.[0]?.rounds) return [];
    return getNumberOptions(data?.orgSeason?.competitionConfigs[0]?.rounds || 0).map(option => ({
      value: option.value,
      label: `${t('LABELS.ROUND')} ${option.label}`,
    }));
  }, [data, t]);

  return { teamOptions, competitionTeamMap, roundOptions, loading, error };
};

export const useCompetitionRoundOptions = (
  orgId?: string,
  seasonId?: string,
  competitionId?: string,
  competitionType?: string
) => {
  const { t } = useTranslation('results');
  const { data, error, loading } = useQuery(FETCH_ORG_SEASON, {
    variables: { orgId: orgId || '', seasonId: seasonId || '' },
    skip: !seasonId || !orgId,
  });

  const roundOptions = useMemo<ISelectOptions[]>(() => {
    if (!competitionId) return [];
    if (!data?.orgSeason?.competitionConfigs?.length) return [];

    const config = data?.orgSeason?.competitionConfigs?.find(
      c => String(c.competitionId._id) === String(competitionId)
    );
    const rounds = config?.rounds;
    if (!rounds) return [];
    const isCup = competitionType?.toLowerCase() === 'cup';

    return getNumberOptions(rounds, 1).map(option => ({
      value: option.value,
      label: isCup
        ? getCupRoundLabel(Number(option.value), rounds, t)
        : `${t('LABELS.ROUND')} ${option.label}`,
    }));
  }, [competitionId, competitionType, data, t]);

  return { roundOptions, loading, error };
};
