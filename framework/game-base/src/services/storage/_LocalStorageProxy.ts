import { IStorageProxy } from './_IStorageProxy';

class LocalStorageProxy implements IStorageProxy {
  async setItem(key: string, value: unknown): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async getItem(key: string): Promise<unknown> {
    const value = localStorage.getItem(key);
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }

  async hasItem(key: string): Promise<boolean> {
    return localStorage.getItem(key) !== null;
  }
}
export { LocalStorageProxy };
