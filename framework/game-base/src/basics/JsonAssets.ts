/* eslint-disable @typescript-eslint/no-explicit-any */
import { GameConfiguration, GameConfigurationKeys } from './GameConfiguration';

const getAssetsLoader = () => {
  const assetsFolder = GameConfiguration.get(
    GameConfigurationKeys.AssetsFolder
  );
  const countAssets = (json: any) => {
    return Object.keys(json).reduce((count, group) => {
      return count + Object.keys(json[group]).length;
    }, 0);
  };

  const pathFixer = (path: string): string => {
    if (assetsFolder) return path.replaceAll('{assets}', assetsFolder);
    return path;
  };

  const loadAssets = async (
    json: any,
    loadAsset: (json: any, group: string, key: string) => Promise<void>
  ) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const group of Object.keys(json)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(json[group])) {
        // eslint-disable-next-line no-await-in-loop
        await loadAsset(json, group, key);
      }
    }
  };
  return {
    countAssets,
    pathFixer,
    loadAssets,
  };
};

export { getAssetsLoader };
