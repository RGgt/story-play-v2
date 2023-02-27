declare module '@rggt/game-base';

import ECursorOptions from './@types/ECursorOptions';

export {
  GameConfiguration,
  GameConfigurationKeys,
} from './basics/GameConfiguration';
export {
  GameVolatileState,
  GameVolatileStateKeys,
} from './basics/GameVolatileState';
export { GameInputPointer } from './basics/GameInputPointer';
export type { GameConfigurationValue } from './basics/GameConfiguration';
export type { GameVolatileStateValue } from './basics/GameVolatileState';
export type { DialogLifetimeController } from './@types/DialogLifetimeController';
export type { GameReactions } from './@types/GameReactions';
export type { GameState } from './@types/GameState';
export type { SPAwareControl } from './@types/SPAwareControl';
export { ECursorOptions };
export { default as CommonWindowStyles } from './basics/Styles/CommonWindowStyles';
export { default as DrawDebug } from './basics/Styles/DrawDebug';
export { default as SaveAndLoadStyles } from './basics/Styles/SaveAndLoadStyles';

export {
  saveScreenshotToFileDownload,
  getMiniatureScreenshotBase64DataURL,
  miniatureBase64DataURLToTexture,
  screenshotToMiniatureTextureAndBase64DataURL,
} from './services/images/screenshot';
export {
  formatDate,
  dateToShortText,
  nowToShortText,
} from './services/dateTime';
export { StorageManager } from './services/storage/StorageManager';
export { SaveGameManager } from './services/storage/SaveGameManager';
