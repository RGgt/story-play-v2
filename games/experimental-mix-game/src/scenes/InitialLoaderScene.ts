import {
  getAssetsLoader,
  loadAssetFromJson,
  assetPathFixer as pathFixer,
} from '@rggt/phaser-asset-loader';
import { createVeryBasicProgressbar } from '@rggt/basic-controls';
import EScenes from './EScenes';
import { reactOnError } from '../logic/reactOnError';

/* This is a very crude Loader Scene, that only uses a very basic
 * progressbar and a log. More advanced controls are not user here
 * as the textures for GUI are not loaded yet.
 */
export default class InitialLoaderScene extends Phaser.Scene {
  constructor() {
    super(EScenes.InitialLoader);
  }

  async preload() {
    try {
      const { countAssets, loadAssets } = getAssetsLoader();
      const json = this.cache.json.get('assets');
      const count = countAssets(json);

      this.add.image(this.centerX(), this.centerY(), 'logo');

      const veryBasicProgressbar = createVeryBasicProgressbar(this, {
        left: this.centerX() - 200,
        top: this.centerY() + 300,
        width: 400,
        height: 40,
        backAlpha: 0.7,
      });

      let crt = 0;
      const loadIndividualAsset = async (
        jsonData: unknown,
        group: string,
        key: string
      ) => {
        // WARNING: ❗ Make sure `group` and `key` are valid elements in
        // `json` as `loadAssets` assumes it! ❗
        await loadAssetFromJson(this, jsonData, group, key, pathFixer);
        crt += 1;
        veryBasicProgressbar?.update(crt, count);
      };
      await loadAssets(json, loadIndividualAsset);
    } catch (err: unknown) {
      reactOnError(this.game, err as Error);
    }
  }

  centerX() {
    return +this.sys.game.config.width / 2;
  }

  centerY() {
    return +this.sys.game.config.height / 2;
  }

  openNextScene() {
    // const sceneCursor = EScenes.Cursor;
    // const sceneToLoad = SPScenes.StoryPlay;
    // const sceneToLoad = EScenes.Experimental;
    // const sceneToLoad = SPScenes.StoryPlay;
    // this.scene.start(sceneToLoad);
    // this.scene.start(sceneCursor);
  }
}
