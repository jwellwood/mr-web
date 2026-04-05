import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TestWrapper from '../../../../utils/test-helpers/TestWrapper';
import TurnstileWidget from '../Turnstile';

vi.mock('react-turnstile', () => ({
  Turnstile: vi.fn(({ onVerify }: { onVerify: (token: string) => void }) => (
    <div data-testid="turnstile-widget" onClick={() => onVerify('test-token')} />
  )),
}));

describe('TurnstileWidget', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders the Turnstile widget when the site key is set', () => {
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY_LOCAL', 'test-site-key');

    render(
      <TestWrapper>
        <TurnstileWidget />
      </TestWrapper>
    );

    expect(screen.getByTestId('turnstile-widget')).toBeInTheDocument();
  });

  it('returns null when the site key is missing', () => {
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY_LOCAL', '');
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY', '');

    const { container } = render(
      <TestWrapper>
        <TurnstileWidget />
      </TestWrapper>
    );

    expect(container.firstChild).toBeNull();
  });

  it('calls onVerify with the token when verification completes', async () => {
    vi.stubEnv('VITE_TURNSTILE_SITE_KEY_LOCAL', 'test-site-key');
    const onVerify = vi.fn();

    render(
      <TestWrapper>
        <TurnstileWidget onVerify={onVerify} />
      </TestWrapper>
    );

    screen.getByTestId('turnstile-widget').click();
    expect(onVerify).toHaveBeenCalledWith('test-token');
  });
});
