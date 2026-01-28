import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { FETCH_SEASONS } from '../modules/history/graphql';
import { useCustomParams } from './useCustomParams';
import type { ISelectOptions } from '../components';

export const useSeasons = () => {
  const [seasonToUse, setSeasonToUse] = useState('');
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

  useEffect(() => {
    if (seasonId) {
      setSeasonToUse(seasonId);
    }
    if (seasonParam) {
      setSeasonToUse(seasonParam);
    }
    const defaultSeason = data?.seasons.length ? data?.seasons[0]._id : '';
    if (!seasonId && !seasonParam) {
      setSeasonToUse(defaultSeason);
    }
  }, [data?.seasons, seasonId, seasonParam]);

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
