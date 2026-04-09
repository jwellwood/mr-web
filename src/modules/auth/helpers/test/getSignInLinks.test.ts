import { describe, expect, it, vi } from 'vitest';
import { AUTH_PATHS } from '../../router';
import { getSignInLinks } from '../getSignInLinks';

const t = vi.fn((key: string) => key) as unknown as Parameters<typeof getSignInLinks>[0];

describe('getSignInLinks', () => {
  it('returns two link items', () => {
    expect(getSignInLinks(t)).toHaveLength(2);
  });

  it('first item links to the sign-up page', () => {
    expect(getSignInLinks(t)[0].link).toBe(AUTH_PATHS.SIGN_UP);
  });

  it('second item links to the forgot password page', () => {
    expect(getSignInLinks(t)[1].link).toBe(AUTH_PATHS.FORGOT);
  });

  it('calls t with each expected translation key', () => {
    const mockT = vi.fn((key: string) => key) as unknown as Parameters<typeof getSignInLinks>[0];
    getSignInLinks(mockT);
    expect(mockT).toHaveBeenCalledWith('LINKS.SIGN_IN_LABEL');
    expect(mockT).toHaveBeenCalledWith('LINKS.SIGN_IN_VALUE');
    expect(mockT).toHaveBeenCalledWith('LINKS.FORGOT_LABEL');
    expect(mockT).toHaveBeenCalledWith('LINKS.FORGOT_VALUE');
  });
});
