/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { storage, authStorage } from '../storage';

describe('storage (safe localStorage wrapper)', () => {
  const realLocalStorage = (global as any).localStorage;
  const realWindow = (global as any).window;

  beforeEach(() => {
    // ensure a clean localStorage
    (global as any).localStorage = {
      _store: {} as Record<string, string>,
      getItem(key: string) {
        return this._store[key] ?? null;
      },
      setItem(key: string, value: string) {
        this._store[key] = String(value);
      },
      removeItem(key: string) {
        delete this._store[key];
      },
      clear() {
        this._store = {};
      },
    };
    (global as any).window = (global as any).window || {};
    (global as any).window.localStorage = (global as any).localStorage;
  });

  afterEach(() => {
    (global as any).localStorage = realLocalStorage;
    (global as any).window = realWindow;
  });

  it('setItem/getItem/removeItem/clear behave as expected and return correct booleans', () => {
    expect(storage.setItem('k', 'v')).toBe(true);
    expect(storage.getItem('k')).toBe('v');
    // set/get token via authStorage convenience methods
    expect(authStorage.setToken('v')).toBe(true);
    expect(authStorage.getToken()).toBe('v');
    expect(storage.removeItem('k')).toBe(true);
    expect(storage.getItem('k')).toBeNull();
    expect(storage.setItem('a', 'b')).toBe(true);
    expect(storage.clear()).toBe(true);
    expect(storage.getItem('a')).toBeNull();
  });

  it('handles localStorage throwing errors gracefully', () => {
    // make setItem throw
    (global as any).localStorage.setItem = () => {
      throw new Error('fail');
    };
    (global as any).localStorage.getItem = () => {
      throw new Error('fail');
    };

    expect(storage.setItem('x', 'y')).toBe(false);
    expect(storage.getItem('x')).toBeNull();

    // removeItem throwing
    (global as any).localStorage.removeItem = () => {
      throw new Error('fail');
    };
    expect(storage.removeItem('x')).toBe(false);

    // clear throwing
    (global as any).localStorage.clear = () => {
      throw new Error('fail');
    };
    expect(storage.clear()).toBe(false);
  });

  it('returns false/null when localStorage is not available (SSR)', () => {
    // simulate SSR: delete window
    const savedWindow = (global as any).window;
    delete (global as any).window;

    try {
      expect(storage.getItem('z')).toBeNull();
      expect(storage.setItem('z', '1')).toBe(false);
      expect(storage.removeItem('z')).toBe(false);
      expect(storage.clear()).toBe(false);
    } finally {
      (global as any).window = savedWindow;
    }
  });
});
