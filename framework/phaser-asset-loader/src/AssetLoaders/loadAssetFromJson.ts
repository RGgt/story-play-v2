import { loadAssetFromNode } from './loadAssetFromNode';

const loadAssetFromJson = async (
  scene: Phaser.Scene,
  json: any,
  group: string,
  key: string,
  pathFixer: (path: string) => string
) => {
  const data = json[group][key];
  loadAssetFromNode(scene, group, key, data, pathFixer);
};
export { loadAssetFromJson };
