import type { ReactNode } from 'react';

export interface TypedFormError {
  type: string;
  message?: string;
  code?: string | number;
  meta?: Record<string, unknown>;
}

export type FormError = string | Error | TypedFormError;

export interface ISelectOptions<V = string | number> {
  label: string | ReactNode;
  value: V;
  disabled?: boolean;
  id?: string | number;
  meta?: Record<string, unknown>;
}
