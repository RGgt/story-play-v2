import { SaveGameManager } from '@rggt/game-base';

interface SaveLoadParameters {
  isSaveMode?: boolean;
  title?: string;
  buttonTextClose?: string;
  callbackClose?: () => void;
  serviceSaveLoad: SaveGameManager;
  game: Phaser.Game;
}
export type { SaveLoadParameters };
