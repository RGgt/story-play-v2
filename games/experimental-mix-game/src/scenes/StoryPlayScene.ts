import { SaveGameManager, StorageManager } from '@rggt/game-base';
import { createButtonWithSimpleText } from '@rggt/nine-patch-controls';
import EScenes from './EScenes';
import SPScene from './SPScene';

export default class StoryPlayScene extends SPScene {
  constructor() {
    super(EScenes.StoryPlay);
    this.events = new Phaser.Events.EventEmitter();
  }

  private _storeManager: StorageManager = new StorageManager();

  private _saveGameManager: SaveGameManager = new SaveGameManager(
    this._storeManager
  );

  onButtonClick() {
    this.game.events.emit('show-dialog', 'SaveLoad', {
      title: 'Save or load',
      buttonTextClose: 'Resume playing',
      callbackClose: this.onResumePlaying.bind(this),
      serviceSaveLoad: this._saveGameManager,
      game: this.game,
    });
  }

  onResumePlaying() {
    this.game.events.emit('show-dialog', 'MessageBox', {
      message: 'You returned to playing the game.\r\n\r\nCongrats!',
    });
  }

  create() {
    createButtonWithSimpleText(
      this,
      {
        x: 200,
        y: 200,
        width: 500,
        height: 150,
        reactionToClick: this.onButtonClick.bind(this),
      },
      {
        text: 'hello world',
      }
    );
  }
}
