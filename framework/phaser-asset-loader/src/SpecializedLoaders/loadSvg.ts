import { safeResourceLoad } from '../Helpers/safeResourceLoad';

const loadSvg = async (
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
        scene.load.svg(key, pathFixer(value));
        scene.load.start();
      },
      () => {
        return scene.game.textures.exists(key);
      }
    );
  };
  await loader(data);
};
export { loadSvg };
