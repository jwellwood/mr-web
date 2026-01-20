import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { useCustomParams } from '../../../hooks';
import type { ISelectOptions } from '../../../components';
import { FETCH_ORG_SEASONS } from '../graphql';

export const useOrgSeasonOptions = () => {
  const { orgId } = useCustomParams();
  const [orgSeasonOptions, setOrgSeasonOptions] = useState<ISelectOptions[]>([]);

  const { data, error, loading } = useQuery(FETCH_ORG_SEASONS, {
    variables: { orgId },
  });

  useEffect(() => {
    if (error) {
      setOrgSeasonOptions([]);
    }
    if (data?.orgSeasons.length) {
      const teams = data.orgSeasons.map(season => {
        return {
          value: season._id,
          label: season.name,
        };
      }) as ISelectOptions[];
      setOrgSeasonOptions(teams);
    }
  }, [data, error]);

  return { orgSeasonOptions, loading };
};
