import { createTitleText } from '@rggt/basic-controls';
import {
  getMiniatureScreenshotBase64DataURL,
  SaveGameManager,
  StorageManager,
  SaveAndLoadStyles,
  GameVolatileState,
  GameVolatileStateKeys,
  GameConfiguration,
  TranslationData,
} from '@rggt/game-base';
import { createButtonWithSimpleText } from '@rggt/nine-patch-controls';
import { CustomGameState } from '../state/CustomGameState';
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

  async onButtonSaveClick() {
    await this.showSaveLoad('save');
  }

  async onButtonLoadClick() {
    await this.showSaveLoad('load');
  }

  async showSaveLoad(viewMode: 'save' | 'load' | 'delete') {
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
      viewMode,

      callbackClose: this.onResumePlaying.bind(this),
      serviceSaveLoad: this._saveGameManager,
      game: this.game,
    });
  }

  onResumePlaying() {
    if (this._demoText) {
      this._demoText.text.text = this._composeSampleText();
    }
  }

  create() {
    GameConfiguration.uITranslationData = this.cache.json.get(
      'translation-ui'
    ) as TranslationData;
    GameConfiguration.translationData = this.cache.json.get(
      'translation'
    ) as TranslationData;

    createButtonWithSimpleText(
      this,
      {
        x: 200,
        y: 200,
        width: 500,
        height: 150,
        reactionToClick: this.onButtonSaveClick.bind(this),
      },
      {
        text: 'Save',
      }
    );
    createButtonWithSimpleText(
      this,
      {
        x: 200 + 524,
        y: 200,
        width: 500,
        height: 150,
        reactionToClick: this.onButtonLoadClick.bind(this),
      },
      {
        text: 'Load',
      }
    );
    this._demoText = createTitleText(this, {
      x: 1920 / 2,
      y: 1080 / 2 + 200,
      text: this._composeSampleText(),
    });
  }

  private _composeSampleText() {
    return `This is the game that was originally started
    ${
      (GameConfiguration.stateAccessor.getStateObject() as CustomGameState)
        .gameStartTime
    }\n\nCurrently, a new game is started each time you refresh the page`;
  }
}
