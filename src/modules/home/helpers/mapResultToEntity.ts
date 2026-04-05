import { Entity } from '../components/EntityList';
import { T_FETCH_ORGS_BY_SEARCH, T_FETCH_TEAMS_BY_SEARCH } from '../graphql';

export const mapSearchResultToEntity = (
  type: 'org' | 'team',
  searchResults?: T_FETCH_ORGS_BY_SEARCH['orgs'] | T_FETCH_TEAMS_BY_SEARCH['teams']
): Entity[] => {
  if (type === 'team') {
    return (
      (searchResults as T_FETCH_TEAMS_BY_SEARCH['teams'])?.map(
        (team: T_FETCH_TEAMS_BY_SEARCH['teams'][number]) => {
          return {
            link: `/org/${team.orgId._id}/team/${team._id}`,
            badge: team?.teamBadge?.url,
            name: team.teamName,
            city: team?.location || '',
            country: team?.country || '',
          };
        }
      ) || []
    );
  } else if (type === 'org') {
    return (
      (searchResults as T_FETCH_ORGS_BY_SEARCH['orgs'])?.map(
        (org: T_FETCH_ORGS_BY_SEARCH['orgs'][number]) => {
          return {
            link: `/org/${org._id}`,
            badge: org?.badge?.url,
            name: org.name,
            city: org?.city || '',
            country: org?.country || '',
          };
        }
      ) || []
    );
  }
  return [];
};
