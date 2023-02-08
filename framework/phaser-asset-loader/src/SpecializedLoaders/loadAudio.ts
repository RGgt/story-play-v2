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
    await loader(data.opus);
  } else if (
    Object.hasOwnProperty.call(data, 'webm') &&
    scene.sys.game.device.audio.webm
  ) {
    await loader(data.webm);
  } else if (
    Object.hasOwnProperty.call(data, 'ogg') &&
    scene.sys.game.device.audio.ogg
  ) {
    await loader(data.ogg);
  } else if (
    Object.hasOwnProperty.call(data, 'wav') &&
    scene.sys.game.device.audio.wav
  ) {
    await loader(data.wav);
  } else {
    await loader(data);
  }
};
export { loadAudio };
