import { IStorageProxy } from './_IStorageProxy';
import { SessionStorageProxy } from './_SessionStorageProxy';

class StorageManager {
  private _storageProxy: IStorageProxy;

  constructor() {
    this._storageProxy = new SessionStorageProxy();
  }

  async setItem(key: string, value: unknown): Promise<void> {
    this._storageProxy.setItem(key, value);
  }

  async getItem(key: string): Promise<unknown> {
    return this._storageProxy.getItem(key);
  }

  async removeItem(key: string): Promise<void> {
    return this._storageProxy.removeItem(key);
  }
}
export { StorageManager };
