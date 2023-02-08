import { safeResourceLoad } from '../Helpers/safeResourceLoad';

const loadJson = async (
  scene: Phaser.Scene,
  type: string,
  key: string,
  data: any,
  pathFixer: (path: string) => string
) => {
  const loader = async (value: string) => {
    await safeResourceLoad(
      scene,
      type,
      key,
      () => {
        scene.load.json(key, pathFixer(value));
        scene.load.start();
      },
      () => {
        return scene.game.cache.json.has(key);
      }
    );
  };
  await loader(data);
};

export { loadJson };
