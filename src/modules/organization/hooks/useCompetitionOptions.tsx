import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { useCustomParams } from '../../../hooks';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import { FETCH_COMPETITIONS } from '../graphql';

export const useCompetitionOptions = () => {
  const { orgId } = useCustomParams();
  const [competitionOptions, setCompetitionOptions] = useState<ISelectOptions[]>([]);

  const { data, error, loading } = useQuery(FETCH_COMPETITIONS, {
    variables: { orgId },
  });

  useEffect(() => {
    if (error) {
      setCompetitionOptions([]);
    }
    if (data?.org?.competitions.length) {
      const competitions = data.org.competitions.map(comp => {
        return {
          value: comp._id,
          label: comp.name,
        };
      }) as ISelectOptions[];
      setCompetitionOptions(competitions);
    }
  }, [data, error]);

  return { competitionOptions, loading };
};
