import { describe, expect, it, vi } from 'vitest';
import { AUTH_PATHS } from '../../router';
import { getSignUpLinks } from '../getSignUpLinks';

describe('getSignUpLinks', () => {
  it('returns one link item', () => {
    const t = vi.fn((key: string) => key) as unknown as Parameters<typeof getSignUpLinks>[0];
    expect(getSignUpLinks(t)).toHaveLength(1);
  });

  it('links to the sign-in page', () => {
    const t = vi.fn((key: string) => key) as unknown as Parameters<typeof getSignUpLinks>[0];
    expect(getSignUpLinks(t)[0].link).toBe(AUTH_PATHS.SIGN_IN);
  });

  it('calls t with each expected translation key', () => {
    const t = vi.fn((key: string) => key) as unknown as Parameters<typeof getSignUpLinks>[0];
    getSignUpLinks(t);
    expect(t).toHaveBeenCalledWith('LINKS.SIGN_UP_LABEL');
    expect(t).toHaveBeenCalledWith('LINKS.SIGN_UP_VALUE');
  });
});
