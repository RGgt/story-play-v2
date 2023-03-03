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
import { GameFlowPlayer } from '../storyPlay/GameFlowPlayer';
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

  private _gameFlowPlayer = new GameFlowPlayer(this);

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
    this.game.events.emit('show-dialog', 'MainMenu', {
      callbackResume: this.onResumePlaying.bind(this),
      callbackSaveLoad: () => {
        this.game.events.emit('show-dialog', 'SaveLoad', {
          viewMode,

          callbackClose: this.onResumePlaying.bind(this),
          serviceSaveLoad: this._saveGameManager,
          game: this.game,
        });
      },
      callbackNew: () => {
        this._gameFlowPlayer?.restartGame();
      },
      callbackPreferences: () => {},
    });
  }

  onResumePlaying() {
    this._gameFlowPlayer?.loadGame();
  }

  async gameFlowEventsHandler(eventCode: string, eventParameters: unknown) {
    switch (eventCode) {
      case 'advance-to-frame':
        this._gameFlowPlayer?.advanceToFrame(eventParameters as string);
        break;
      case 'rollback-to-frame':
        this._gameFlowPlayer?.rollbackToFrame();
        break;
      case 'request-game-menu':
        await this.showSaveLoad('load');
        break;

      default:
        throw new Error(`Invalid event game flow code '${eventCode}'`);
    }
  }

  create() {
    GameConfiguration.uITranslationData = this.cache.json.get(
      'translation-ui'
    ) as TranslationData;
    GameConfiguration.translationData = this.cache.json.get(
      'translation'
    ) as TranslationData;

    GameConfiguration.stableDataAccessor.setStableData(
      this.cache.json.get('story-flow')
    );

    this.game.events.on(
      'game-flow-event',
      this.gameFlowEventsHandler.bind(this),
      this
    );

    this._gameFlowPlayer = new GameFlowPlayer(this);
    this._gameFlowPlayer.restartGame();
  }
}
