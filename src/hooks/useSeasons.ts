import { useQuery } from '@apollo/client/react';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { ISelectOptions } from '../components';
import { FETCH_SEASONS } from '../modules/history/graphql';
import { useCustomParams } from './useCustomParams';

export const useSeasons = () => {
  // derive seasonToUse from params or data
  const { teamId, seasonId } = useCustomParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const seasonParam = searchParams.get('season');

  const { data, loading, error } = useQuery(FETCH_SEASONS, {
    variables: { teamId: teamId! },
  });

  const seasonOptions: ISelectOptions[] = [];

  if (data && data.seasons.length) {
    data.seasons.forEach(season => {
      let label = season.name;
      const value = season._id;
      if (season._id === data.seasons[0]._id) {
        label = season.name;
      }
      seasonOptions.push({ label, value });
    });
  }

  const seasonToUse = useMemo(() => {
    if (seasonId) return seasonId;
    if (seasonParam) return seasonParam;
    return data?.seasons?.[0]?._id ?? '';
  }, [seasonId, seasonParam, data?.seasons]);

  const onSelectSeason = useCallback(
    (seasonId: string) => {
      const params = { season: seasonId };
      setSearchParams(params);
    },
    [setSearchParams]
  );

  const seasonEndDate =
    data?.seasons?.find(season => season._id === seasonToUse)?.yearEnded || null;

  return {
    seasonId: seasonToUse,
    seasonReady: !loading && !!data,
    onSelectSeason,
    loading,
    error,
    data,
    seasonOptions,
    seasonEndDate,
  };
};
