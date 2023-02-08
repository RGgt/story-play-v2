import { safeResourceLoad } from '../Helpers/safeResourceLoad';

const loadImage = async (
  scene: Phaser.Scene,
  type: string,
  key: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  await loader(data);
};
export { loadImage };
