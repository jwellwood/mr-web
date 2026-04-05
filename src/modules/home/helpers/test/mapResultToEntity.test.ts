import { describe, it, expect } from 'vitest';
import { T_FETCH_ORGS_BY_SEARCH, T_FETCH_TEAMS_BY_SEARCH } from '../../graphql';
import { mapSearchResultToEntity } from '../mapResultToEntity';

describe('mapSearchResultToEntity', () => {
  it('should map team search results to entities', () => {
    const teams = [
      {
        _id: 'team1',
        teamName: 'Team A',
        orgId: { _id: 'org1' },
        teamBadge: { url: 'https://example.com/badge.png' },
        location: 'New York',
        country: 'USA',
      },
    ] as T_FETCH_TEAMS_BY_SEARCH['teams'];

    const result = mapSearchResultToEntity('team', teams);

    expect(result).toEqual([
      {
        link: '/org/org1/team/team1',
        badge: 'https://example.com/badge.png',
        name: 'Team A',
        city: 'New York',
        country: 'USA',
      },
    ]);
  });

  it('should map org search results to entities', () => {
    const orgs = [
      {
        _id: 'org1',
        name: 'Org A',
        badge: { url: 'https://example.com/org-badge.png' },
        city: 'San Francisco',
        country: 'USA',
      },
    ] as T_FETCH_ORGS_BY_SEARCH['orgs'];

    const result = mapSearchResultToEntity('org', orgs);

    expect(result).toEqual([
      {
        link: '/org/org1',
        badge: 'https://example.com/org-badge.png',
        name: 'Org A',
        city: 'San Francisco',
        country: 'USA',
      },
    ]);
  });

  it('should return empty array for undefined search results', () => {
    expect(mapSearchResultToEntity('team', undefined)).toEqual([]);
    expect(mapSearchResultToEntity('org', undefined)).toEqual([]);
  });

  it('should handle missing optional fields with defaults', () => {
    const teams = [
      {
        _id: 'team1',
        teamName: 'Team B',
        orgId: { _id: 'org1' },
        teamBadge: null,
        location: null,
        country: null,
      },
    ] as T_FETCH_TEAMS_BY_SEARCH['teams'];

    const result = mapSearchResultToEntity('team', teams);

    expect(result[0].city).toBe('');
    expect(result[0].country).toBe('');
    expect(result[0].badge).toBeUndefined();
  });
});
