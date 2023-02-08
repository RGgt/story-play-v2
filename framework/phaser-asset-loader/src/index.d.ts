declare module '@rggt/phaser-asset-loader';

export { loadAssetFromJson } from './AssetLoaders/loadAssetFromJson';
export {
  loadAssetFromNode,
  loadAssetFromCommonNode,
} from './AssetLoaders/loadAssetFromNode';
export {
  getAssetsLoader,
  assetPathFixer,
} from './AssetLoaders/getAssetsLoader';
