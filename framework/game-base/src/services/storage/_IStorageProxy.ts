interface IStorageProxy {
  setItem(key: string, value: unknown): Promise<void>;
  getItem(key: string): Promise<unknown | null>;
  removeItem(key: string): Promise<void>;
  hasItem(key: string): Promise<boolean>;
}
export type { IStorageProxy };
