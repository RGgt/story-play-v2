import { IStorageProxy } from './_IStorageProxy';

class CloudStorageProxy implements IStorageProxy {
  async setItem(key: string, value: unknown): Promise<void> {
    // Check that value is an object before stringify-ing it
    if (typeof value !== 'object') {
      throw new Error('Value must be an object');
    }

    // Cast value to the correct type
    const data = value as Record<string, unknown>;

    const response = await fetch('http://example.com/api/set', {
      method: 'POST',
      body: JSON.stringify({ key, data }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to save data to cloud storage');
    }
  }

  async getItem(key: string): Promise<unknown> {
    const response = await fetch(`http://example.com/api/get?key=${key}`);
    if (!response.ok) {
      throw new Error('Failed to retrieve data from cloud storage');
    }
    const result = await response.json();
    return result.value;
  }

  async removeItem(key: string): Promise<void> {
    const response = await fetch(`http://example.com/api/remove?key=${key}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove data from cloud storage');
    }
  }

  async hasItem(key: string): Promise<boolean> {
    const value = await this.getItem(key);
    return value !== null && value !== undefined;
  }
}
export { CloudStorageProxy };
