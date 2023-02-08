import { safeResourceLoad } from '../Helpers/safeResourceLoad';

const loadImage = async (
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
        scene.load.image(key, pathFixer(value));
        scene.load.start();
      },
      () => {
        return !scene.game.textures.get(key);
      }
    );
  };
  loader(data);
};
export { loadImage };
