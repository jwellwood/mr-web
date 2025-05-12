import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ICompetition } from '../../../types';
import { ISelectOptions } from '../../../components/inputs/SelectInput';
import { GET_ORG } from '../../organization/graphql';
import { emptySelectOption } from '../../matches/constants.ts';

export const useSeasonInput = (orgId?: string) => {
  const [competitions, setCompetitions] = useState<ICompetition[]>([]);
  const [competitionOptions, setCompetitionOptions] = useState<ISelectOptions[]>([]);

  const [getOrgById, { data: orgData, loading: orgLoading, error: orgError }] = useLazyQuery(
    GET_ORG,
    { variables: { orgId } }
  );

  useEffect(() => {
    if (orgId) {
      getOrgById();
    }
  }, [getOrgById, orgId]);

  useEffect(() => {
    if (orgData) {
      setCompetitions(orgData.org.competitions);
      const options: ISelectOptions[] = [
        emptySelectOption,
        ...competitions
          .filter(comp => comp.competitionType === 'League')
          .map(competition => ({
            label: competition.name,
            value: competition.name,
          })),
      ];
      setCompetitionOptions(options);
    }
  }, [competitions, orgData]);
  return {
    competitionOptions,
    orgError,
    orgLoading,
  };
};
