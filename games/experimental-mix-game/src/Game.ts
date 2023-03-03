import {
  DialogLifetimeController,
  formatDate,
  GameConfiguration,
  GameInputPointer,
} from '@rggt/game-base';
import Phaser from 'phaser';
import { reactToCursorOption } from './logic/reactToCursorOption';
import { reactToError } from './logic/reactToError';
import { reactToNewDialogRequest } from './logic/reactToNewDialogRequest';
import CriticalErrorScene from './scenes/CriticalErrorScene';
import CursorScene from './scenes/CursorScene';
import DialogWindowsScene from './scenes/DialogWindowsScene';
import InitialLoaderScene from './scenes/InitialLoaderScene';
import KeyboardInputScene from './scenes/KeyboardInputScene';
import StartupScene from './scenes/StartupScene';
import StoryPlayScene from './scenes/StoryPlayScene';

export default class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    const scenes = Game.getScenes();
    const realConfig = { ...config, scene: scenes };
    super(realConfig);

    GameConfiguration.gameReactions.reactToError = (err: unknown) => {
      reactToError(this, err);
    };
    GameConfiguration.gameReactions.reactToCursorOption = (
      cursorOption: string
    ) => {
      reactToCursorOption(this, cursorOption);
    };
    GameConfiguration.gameReactions.reactToNewDialogRequest = (
      lifetimeController: DialogLifetimeController
    ) => {
      reactToNewDialogRequest(this, lifetimeController);
    };

    this._listenKeyEventsCorrectly();
  }

  /**
   * Attempt to fix an oversight of Phaser III which makes the game
   * keep handling attached keys even if some other HTML elements
   * have now the focus.
   */
  private _listenKeyEventsCorrectly() {
    const { canvas } = this;

    const parent = canvas.parentElement;
    if (!parent) return;

    parent.tabIndex = 0;
    parent.focus();

    // Add an event listener for the blur event
    parent.addEventListener('blur', () => {
      // Disable keyboard input when the canvas loses focus
      this.input.keyboard.enabled = false;
      // this.input.keyboard.stopListeners();
    });

    // Add an event listener for the focus event
    parent.addEventListener('focus', () => {
      // Enable keyboard input when the canvas regains focus
      this.input.keyboard.enabled = true;
    });

    // Give game focus when clicked
    parent.addEventListener('click', () => {
      parent.focus();
    });
  }

  override step(time: number, delta: number): void {
    const pointer = this.input.activePointer;
    GameInputPointer.x = pointer.x;
    GameInputPointer.y = pointer.y;
    GameInputPointer.button = pointer.button;
    GameInputPointer.isDown = pointer.isDown;
    GameInputPointer.alreadyHandled = false;
    Phaser.Game.prototype.step.call(this, time, delta);
  }

  private static getScenes = (): Array<Phaser.Scene> => {
    return [
      new StartupScene(),
      new KeyboardInputScene(),
      new InitialLoaderScene(),
      new StoryPlayScene(),
      new DialogWindowsScene(),
      new CriticalErrorScene(),
      new CursorScene(),
    ];
  };
}
