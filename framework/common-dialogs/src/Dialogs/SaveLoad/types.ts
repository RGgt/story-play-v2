import { SaveGameManager } from '@rggt/game-base';

interface SaveLoadParameters {
  isSaveMode?: boolean;
  titleSave?: string;
  titleLoad?: string;
  titleDelete?: string;
  buttonTextClose?: string;
  buttonTextSave?: string;
  buttonTextLoad?: string;
  buttonTextDelete?: string;
  callbackClose?: () => void;
  serviceSaveLoad: SaveGameManager;
  game: Phaser.Game;
}
export type { SaveLoadParameters };
