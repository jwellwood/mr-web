import { Entity } from '../components/EntityList';
import { FETCH_ORGS_BY_SEARCH_QUERY, FETCH_TEAMS_BY_SEARCH_QUERY } from '../types';

export const mapSearchResultToEntity = (
  type: 'org' | 'team',
  searchResults?: FETCH_ORGS_BY_SEARCH_QUERY['orgs'] | FETCH_TEAMS_BY_SEARCH_QUERY['teams']
): Entity[] => {
  if (type === 'team') {
    return (
      (searchResults as FETCH_TEAMS_BY_SEARCH_QUERY['teams'])?.map(
        (team: FETCH_TEAMS_BY_SEARCH_QUERY['teams'][number]) => {
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
      (searchResults as FETCH_ORGS_BY_SEARCH_QUERY['orgs'])?.map(
        (org: FETCH_ORGS_BY_SEARCH_QUERY['orgs'][number]) => {
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
