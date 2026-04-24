import { useQuery } from '@apollo/client/react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ISelectOptions } from '../../../components';
import { useCustomParams } from '../../../hooks';
import { getNumberOptions } from '../../../utils';
import { FETCH_ORG_SEASON } from '../../seasons/graphql';

export const useTeamOptions = () => {
  const { t } = useTranslation('results');
  const { orgSeasonId } = useCustomParams();
  const { data, error, loading } = useQuery(FETCH_ORG_SEASON, {
    variables: { seasonId: orgSeasonId! },
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

  const roundOptions = useMemo<ISelectOptions[]>(() => {
    if (!data?.orgSeason?.competitionConfigs?.[0]?.rounds) return [];
    return getNumberOptions(data?.orgSeason?.competitionConfigs[0]?.rounds || 0).map(option => ({
      value: option.value,
      label: `${t('LABELS.ROUND')} ${option.label}`,
    }));
  }, [data, t]);

  return { teamOptions, roundOptions, loading, error };
};
