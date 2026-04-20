import { useQuery } from '@apollo/client/react';
import { useCustomParams } from '../../../hooks';
import { FETCH_ORG } from '../../organization/graphql';
import { TeamFormData } from '../forms/add-team/schema';

export const useInitialTeamState = () => {
  const { orgId } = useCustomParams();

  const { data, loading, error } = useQuery(FETCH_ORG, { variables: { orgId: orgId! } });

  const initialTeamDetailsState: TeamFormData = {
    teamName: '',
    yearFounded: new Date(),
    location: data?.org.city || '',
    country: data?.org.country || '',
    stadiumName: '',
    stadiumLocation: '',
    stadiumCapacity: '',
    stadiumSurface: '',
    homeShirt: '#ffffff',
    homeShorts: '#ffffff',
    homeSocks: '#ffffff',
    awayShirt: '#000000',
    awayShorts: '#000000',
    awaySocks: '#000000',
    kitsBackground: '#808080',
    isActive: true,
  };

  return { initialTeamDetailsState, loading, error };
};
