const loadAsset = async (
  scene: Phaser.Scene,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  json: any,
  group: string,
  key: string,
  pathFixer: (path: string) => string
) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 50);
  });
  const value = json[group][key];
  if (!value) return;
  if (
    group === 'atlas' ||
    group === 'unityAtlas' ||
    group === 'bitmapFont' ||
    group === 'spritesheet' ||
    group === 'multiatlas'
  ) {
    // ƒ(key, textureURL,  atlasURL,...)
    scene.load[group](key, pathFixer(value[0]), value[1]);
  } else if (group === 'audio') {
    // do not add mp3 unless, you bought a license 😉
    // opus, webm and ogg are way better than mp3
    if (
      Object.hasOwnProperty.call(value, 'opus') &&
      scene.sys.game.device.audio.opus
    ) {
      scene.load[group](key, pathFixer(value.opus));
    } else if (
      Object.hasOwnProperty.call(value, 'webm') &&
      scene.sys.game.device.audio.webm
    ) {
      scene.load[group](key, pathFixer(value.webm));
    } else if (
      Object.hasOwnProperty.call(value, 'ogg') &&
      scene.sys.game.device.audio.ogg
    ) {
      scene.load[group](key, pathFixer(value.ogg));
    } else if (
      Object.hasOwnProperty.call(value, 'wav') &&
      scene.sys.game.device.audio.wav
    ) {
      scene.load[group](key, pathFixer(value.wav));
    }
  } else if (group === 'html') {
    // ƒ (key, url, xhrSettings)
    scene.load[group](key, pathFixer(value[0]), value[1]);
  } else if (group === 'htmlTexture') {
    // ƒ (key, url, width, height, xhrSettings)
    scene.load[group](key, pathFixer(value[0]), value[1], value[2], value[3]);
  } else if (
    group === 'animation' ||
    group === 'binary' ||
    group === 'glsl' ||
    group === 'image' ||
    group === 'json'
  ) {
    // animation:ƒ (key, url, ...)
    scene.load[group](key, pathFixer(value));
  } else if (
    group === 'plugin' ||
    group === 'script' ||
    group === 'svg' ||
    group === 'text'
  ) {
    // animation:ƒ (key, url, ...)
    scene.load[group](key, pathFixer(value));
  } else if (
    group === 'tilemapCSV' ||
    group === 'tilemapTiledJSON' ||
    group === 'xml'
  ) {
    // animation:ƒ (key, url, ...)
    scene.load[group](key, pathFixer(value));
  }
};

export { loadAsset };
