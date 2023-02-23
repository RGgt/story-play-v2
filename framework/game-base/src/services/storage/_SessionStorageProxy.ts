import { IStorageProxy } from './_IStorageProxy';

class SessionStorageProxy implements IStorageProxy {
  async setItem(key: string, value: unknown): Promise<void> {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  async getItem(key: string): Promise<unknown> {
    const value = sessionStorage.getItem(key);
    if (value === null) {
      return null;
    }
    return JSON.parse(value);
  }

  async removeItem(key: string): Promise<void> {
    sessionStorage.removeItem(key);
  }

  async hasItem(key: string): Promise<boolean> {
    return sessionStorage.getItem(key) !== null;
  }
}
export { SessionStorageProxy };
