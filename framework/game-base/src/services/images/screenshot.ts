const saveScreenshotToFileDownload = (game: Phaser.Game, fileName: string) => {
  game.renderer.snapshot((snapshot) => {
    const image = snapshot as HTMLImageElement;
    const canvas = document.createElement('canvas') as HTMLCanvasElement;
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(
      image,
      0,
      0,
      image.width,
      image.height,
      0,
      0,
      image.width,
      image.height
    );
    const link = document.createElement('a');
    link.download = fileName;
    link.href = canvas.toDataURL();
    link.click();
  });
};

const getMiniatureScreenshotBase64DataURL = (
  game: Phaser.Game,
  width: number,
  height: number
) => {
  return new Promise<string>((resolve, reject) => {
    try {
      game.renderer.snapshot((snapshot) => {
        const imageHtml = snapshot as HTMLImageElement;
        const canvas = document.createElement('canvas') as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;
        context.drawImage(
          imageHtml,
          0,
          0,
          imageHtml.width,
          imageHtml.height,
          0,
          0,
          canvas.width,
          canvas.height
        );
        resolve(canvas.toDataURL());
      });
    } catch (err: unknown) {
      reject(err);
    }
  });
};

const miniatureBase64DataURLToTexture = (
  game: Phaser.Game,
  base64DataUrl: string,
  textureName: string
) => {
  return new Promise<void>((resolve, reject) => {
    try {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.addEventListener('error', (e: ErrorEvent) => {
        // eslint-disable-next-line no-console
        console.log(`Error capturing game screen: ${e.message}`);
        reject(new Error(`Error capturing game screen: ${e.message}`));
      });
      image.addEventListener('load', () => {
        game.textures.remove(textureName);
        game.textures.addImage(textureName, image);
        resolve();
      });
      image.src = base64DataUrl;
    } catch (err: unknown) {
      reject(err);
    }
  });
};

const screenshotToMiniatureTextureAndBase64DataURL = async (
  game: Phaser.Game,
  width: number,
  height: number,
  textureName: string
) => {
  const base64DataUrl = await getMiniatureScreenshotBase64DataURL(
    game,
    width,
    height
  );
  await miniatureBase64DataURLToTexture(game, base64DataUrl, textureName);
  return base64DataUrl;
};

export {
  saveScreenshotToFileDownload,
  getMiniatureScreenshotBase64DataURL,
  miniatureBase64DataURLToTexture,
  screenshotToMiniatureTextureAndBase64DataURL,
};
