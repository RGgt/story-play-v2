import { createTitleText } from '@rggt/basic-controls';
import {
  getMiniatureScreenshotBase64DataURL,
  SaveGameManager,
  StorageManager,
  SaveAndLoadStyles,
  GameVolatileState,
  GameVolatileStateKeys,
  GameConfiguration,
} from '@rggt/game-base';
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

  private _demoText?: {
    text: Phaser.GameObjects.Text;
    destroy: () => void;
  };

  async onButtonClick() {
    const b64 = await getMiniatureScreenshotBase64DataURL(
      this.game,
      SaveAndLoadStyles.saveSlots.thumbnailWidth,
      SaveAndLoadStyles.saveSlots.thumbnailHeight
    );
    GameVolatileState.set(
      GameVolatileStateKeys.MostRecentBase64Screenshot,
      b64
    );
    this.game.events.emit('show-dialog', 'SaveLoad', {
      titleSave: 'Save',
      titleLoad: 'Load',
      titleDelete: 'Delete',
      buttonTextClose: 'Return',
      buttonTextSave: 'Save',
      buttonTextLoad: 'Load',
      buttonTextDelete: 'Delete',
      callbackClose: this.onResumePlaying.bind(this),
      serviceSaveLoad: this._saveGameManager,
      game: this.game,
    });
  }

  onResumePlaying() {
    // this.game.events.emit('show-dialog', 'MessageBox', {
    //   message: `You returned to playing the game.\r\n\r\nCongrats!\nThe game you are playing now was started at ${
    //     GameConfiguration.stateAccessor.getStateObject().startTime
    //   }`,
    // });
    console.log('onResumePlaying', this._demoText);
    if (this._demoText) {
      this._demoText.text.text =
        GameConfiguration.stateAccessor.getStateObject().startTime;
      console.log('updating time');
    }
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
    this._demoText = createTitleText(this, {
      x: 1920 / 2,
      y: 1080 / 2,
      text: GameConfiguration.stateAccessor.getStateObject().startTime,
    });
  }
}
