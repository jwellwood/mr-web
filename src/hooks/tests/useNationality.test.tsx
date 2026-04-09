import { renderHook } from '@testing-library/react';
import { type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { describe, expect, it } from 'vitest';
import i18n from '../../i18n/react-i18n';
import { useNationality } from '../useNationality';

const wrapper = ({ children }: { children: ReactNode }) => (
  <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
);

describe('useNationality', () => {
  it('returns a non-empty list of nationality options', () => {
    const { result } = renderHook(() => useNationality(), { wrapper });
    expect(result.current.nationalityOptions.length).toBeGreaterThan(1);
  });

  it('includes an empty sentinel as the first option', () => {
    const { result } = renderHook(() => useNationality(), { wrapper });
    const [first] = result.current.nationalityOptions;
    expect(first.value).toBe('');
    expect(first.label).toBe('');
  });

  it('options after the sentinel have non-empty labels and values', () => {
    const { result } = renderHook(() => useNationality(), { wrapper });
    const [, second] = result.current.nationalityOptions;
    expect(second.value.length).toBeGreaterThan(0);
    expect(second.label.length).toBeGreaterThan(0);
  });

  it('resolves countryName for a valid ISO code', () => {
    const { result } = renderHook(() => useNationality('ES'), { wrapper });
    expect(typeof result.current.countryName).toBe('string');
    expect(result.current.countryName!.length).toBeGreaterThan(0);
  });

  it('returns null countryName when no code is provided', () => {
    const { result } = renderHook(() => useNationality(), { wrapper });
    expect(result.current.countryName).toBeNull();
  });

  it('getCountryName resolves a name for a valid code', () => {
    const { result } = renderHook(() => useNationality(), { wrapper });
    const name = result.current.getCountryName('GB');
    expect(typeof name).toBe('string');
    expect(name!.length).toBeGreaterThan(0);
  });

  it('countryName and getCountryName return the same value for the same code', () => {
    const code = 'FR';
    const { result } = renderHook(() => useNationality(code), { wrapper });
    expect(result.current.countryName).toBe(result.current.getCountryName(code));
  });
});
