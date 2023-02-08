/* eslint-disable @typescript-eslint/no-use-before-define */

/**
 * Monitor the loading of an asset
 * @param scene - The scene object from Phaser.
 * @param group - The type of resource. This is used ONLY
 * to build relevant error messages
 * @param key - The key of resource. This is used ONLY
 * to build relevant error messages
 * @param loadResource - A function that actually triggers
 * the load of the resource.
 * @param isAlreadyLoaded - A function that checks if
 * the asset is already loaded.
 * @warning ❗ If you do not want to trigger an error if the
 * asset is already loaded, make sure `isAlreadyLoaded`
 * always returns false❗
 */
const safeResourceLoad = async (
  scene: Phaser.Scene,
  group: string,
  key: string,
  loadResource: () => void,
  isAlreadyLoaded: () => boolean
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const TIMEOUT_INTERVAL = 30000;

    // Raise an error, if the resource is already loaded
    if (isAlreadyLoaded()) {
      resolve();
    }

    const onFileComplete = (id: string) => {
      if (key === id) {
        clearTimeout(timeoutId);
        scene.load.off(Phaser.Loader.Events.FILE_COMPLETE, onFileComplete);
        scene.load.off(Phaser.Loader.Events.FILE_LOAD_ERROR, onFileError);
        resolve();
      }
    };
    const onFileError = (id: { key: string }) => {
      if (key === id.key) {
        // Raise an error if operation fails
        clearTimeout(timeoutId);
        scene.load.off(Phaser.Loader.Events.FILE_COMPLETE, onFileComplete);
        scene.load.off(Phaser.Loader.Events.FILE_LOAD_ERROR, onFileError);
        reject(new Error(`Error loading ${group} '${key}'`));
      }
    };

    scene.load.on(Phaser.Loader.Events.FILE_COMPLETE, onFileComplete);
    scene.load.on(Phaser.Loader.Events.FILE_LOAD_ERROR, onFileError);

    // Raise an error if operation timeouts
    const timeoutId = setTimeout(() => {
      scene.load.off(Phaser.Loader.Events.FILE_COMPLETE, onFileComplete);
      scene.load.off(Phaser.Loader.Events.FILE_LOAD_ERROR, onFileError);
      reject(new Error(`Timeout loading ${group} '${key}'`));
    }, TIMEOUT_INTERVAL);

    loadResource();
  });
};
export { safeResourceLoad };
