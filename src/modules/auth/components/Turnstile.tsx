import { Turnstile } from 'react-turnstile';
import { CustomStack } from '../../../components/grids';

interface Props {
  onVerify?: (token: string) => void;
}

export default function TurnstileWidget({ onVerify }: Props) {
  const siteKey = import.meta.env.DEV
    ? import.meta.env.VITE_TURNSTILE_SITE_KEY_LOCAL
    : import.meta.env.VITE_TURNSTILE_SITE_KEY;

  if (!siteKey) {
    console.error('[Turnstile] Missing sitekey — VITE_TURNSTILE_SITE_KEY is not set.');
    return null;
  }

  return (
    <CustomStack>
      <Turnstile
        sitekey={siteKey}
        onVerify={token => onVerify?.(token)}
        appearance="interaction-only"
      />
    </CustomStack>
  );
}
