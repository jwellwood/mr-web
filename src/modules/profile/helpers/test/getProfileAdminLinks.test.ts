import { describe, it, expect, vi } from 'vitest';
import { LINK_TYPE } from '../../../../constants';
import { ORG_PATHS } from '../../../organization/router';
import { PROFILE_PATHS } from '../../router';
import { getProfileAdminLinks } from '../getProfileAdminLinks';

describe('getProfileAdminLinks', () => {
  const t = vi.fn((key: string) => key) as unknown as Parameters<typeof getProfileAdminLinks>[0];

  it('returns an array of four links', () => {
    const links = getProfileAdminLinks(t);
    expect(links).toHaveLength(4);
  });

  it('first link points to add organization path', () => {
    const links = getProfileAdminLinks(t);
    expect(links[0].link).toBe(ORG_PATHS.ADD);
    expect(links[0].type).toBe(LINK_TYPE.ADD);
  });

  it('second link points to edit profile path', () => {
    const links = getProfileAdminLinks(t);
    expect(links[1].link).toBe(PROFILE_PATHS.EDIT);
    expect(links[1].type).toBe(LINK_TYPE.EDIT);
  });

  it('third link points to edit image path', () => {
    const links = getProfileAdminLinks(t);
    expect(links[2].link).toBe(PROFILE_PATHS.EDIT_IMAGE);
    expect(links[2].type).toBe(LINK_TYPE.EDIT);
  });

  it('fourth link points to change password path', () => {
    const links = getProfileAdminLinks(t);
    expect(links[3].link).toBe(PROFILE_PATHS.CHANGE_PASSWORD);
    expect(links[3].type).toBe(LINK_TYPE.EDIT);
  });

  it('calls t with all expected keys', () => {
    getProfileAdminLinks(t);
    expect(t).toHaveBeenCalledWith('LINKS.ADD_NEW_ORGANIZATION');
    expect(t).toHaveBeenCalledWith('LINKS.EDIT_PROFILE');
    expect(t).toHaveBeenCalledWith('LINKS.EDIT_IMAGE');
    expect(t).toHaveBeenCalledWith('LINKS.CHANGE_PASSWORD');
  });
});
