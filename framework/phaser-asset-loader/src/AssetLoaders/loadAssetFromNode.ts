import { loadAudio } from '../SpecializedLoaders/loadAudio';
import { loadImage } from '../SpecializedLoaders/loadImage';
import { loadJson } from '../SpecializedLoaders/loadJson';
import { loadSvg } from '../SpecializedLoaders/loadSvg';

const loadAssetFromNode = async (
  scene: Phaser.Scene,
  type: string,
  key: string,
  data: any,
  pathFixer: (path: string) => string
) => {
  if (!data) throw new Error(`No data specified for loading ${type} '${key}'`);
  switch (type) {
    case 'animation':
    case 'binary':
    case 'glsl':
    case 'plugin':
    case 'script':
    case 'text':
    case 'tilemapCSV':
    case 'tilemapTiledJSON':
    case 'xml':
      // ƒ (key, url, ...)
      // Normally something like: scene.load[type](key, pathFixer(data[0]));
      throw new Error(`Loading of ${type} resources not implemented!'`);
    case 'html':
      // ƒ (key, url, xhrSettings)
      // Normally something like: scene.load[type](key, pathFixer(data[0]), data[1]);
      throw new Error(`Loading of ${type} resources not implemented!'`);
    case 'atlas':
    case 'unityAtlas':
    case 'bitmapFont':
    case 'spritesheet':
    case 'multiatlas':
      // ƒ(key, textureURL,  atlasURL,...)
      // Normally something like: scene.load[type](key, pathFixer(data[0]), data[1]);
      throw new Error(`Loading of ${type} resources not implemented!'`);
    case 'htmlTexture':
      // ƒ (key, url, width, height, xhrSettings)
      // Normally something like: scene.load[type](key, pathFixer(data[0]), data[1], data[2], data[3]);
      throw new Error(`Loading of ${type} resources not implemented!'`);
    case 'audio':
      loadAudio(scene, type, key, data, pathFixer);
      break;
    case 'image':
      loadImage(scene, type, key, data, pathFixer);
      break;
    case 'svg':
      loadSvg(scene, type, key, data, pathFixer);
      break;
    case 'json':
      loadJson(scene, type, key, data, pathFixer);
      break;
    default:
      throw new Error(`Unknown asset type ${type} for '${key}'`);
  }
};
export { loadAssetFromNode };
