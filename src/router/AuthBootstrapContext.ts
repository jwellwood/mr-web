import { createContext } from 'react';

interface AuthBootstrapContextValue {
  hasRetryableError: boolean;
  retry: () => void;
}

export const AuthBootstrapContext = createContext<AuthBootstrapContextValue>({
  hasRetryableError: false,
  retry: () => undefined,
});
