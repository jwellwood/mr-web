/**
 * Safe localStorage wrapper with SSR compatibility
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
};

export const storage = {
  getItem: (key: string): string | null => {
    if (!isLocalStorageAvailable()) return null;
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return null;
    }
  },

  setItem: (key: string, value: string): boolean => {
    if (!isLocalStorageAvailable()) return false;
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
      return false;
    }
  },

  removeItem: (key: string): boolean => {
    if (!isLocalStorageAvailable()) return false;
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
      return false;
    }
  },

  clear: (): boolean => {
    if (!isLocalStorageAvailable()) return false;
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },
};

// Convenience getters/setters for known keys
export const authStorage = {
  getToken: () => storage.getItem('token'),
  setToken: (token: string) => storage.setItem('token', token),
  removeToken: () => storage.removeItem('token'),
};
