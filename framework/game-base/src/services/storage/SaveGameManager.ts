import { StorageManager } from './StorageManager';

class SaveGameManager {
  constructor(private _storageManager: StorageManager) {}

  async saveGameHeader(slotIndex: number, value: unknown): Promise<void> {
    this._storageManager.setItem(
      SaveGameManager._getHeaderKey(slotIndex),
      value
    );
  }

  async loadGameHeader(slotIndex: number): Promise<unknown> {
    return this._storageManager.getItem(
      SaveGameManager._getHeaderKey(slotIndex)
    );
  }

  async deleteGameHeader(slotIndex: number): Promise<void> {
    return this._storageManager.removeItem(
      SaveGameManager._getHeaderKey(slotIndex)
    );
  }

  private static _getHeaderKey(slotIndex: number) {
    return `save_${slotIndex}_header`;
  }

  async saveGameDetails(slotIndex: number, value: unknown): Promise<void> {
    this._storageManager.setItem(
      SaveGameManager._getDetailsKey(slotIndex),
      value
    );
  }

  async loadGameDetails(slotIndex: number): Promise<unknown> {
    return this._storageManager.getItem(
      SaveGameManager._getDetailsKey(slotIndex)
    );
  }

  async deleteGameDetails(slotIndex: number): Promise<void> {
    return this._storageManager.removeItem(
      SaveGameManager._getDetailsKey(slotIndex)
    );
  }

  private static _getDetailsKey(slotIndex: number) {
    return `save_${slotIndex}_details`;
  }
}
export { SaveGameManager };
