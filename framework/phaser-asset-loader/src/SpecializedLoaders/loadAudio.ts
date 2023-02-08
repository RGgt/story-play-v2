import { safeResourceLoad } from '../Helpers/safeResourceLoad';

const loadAudio = async (
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
        scene.load.audio(key, pathFixer(value));
        scene.load.start();
      },
      () => {
        return scene.game.cache.audio.has(key);
      }
    );
  };
  // do not add mp3 unless, you bought a license 😉
  // opus, webm and ogg are way better than mp3
  if (
    Object.hasOwnProperty.call(data, 'opus') &&
    scene.sys.game.device.audio.opus
  ) {
    loader(data.opus);
  } else if (
    Object.hasOwnProperty.call(data, 'webm') &&
    scene.sys.game.device.audio.webm
  ) {
    loader(data.webm);
  } else if (
    Object.hasOwnProperty.call(data, 'ogg') &&
    scene.sys.game.device.audio.ogg
  ) {
    loader(data.ogg);
  } else if (
    Object.hasOwnProperty.call(data, 'wav') &&
    scene.sys.game.device.audio.wav
  ) {
    loader(data.wav);
  } else {
    loader(data);
  }
};
export { loadAudio };
