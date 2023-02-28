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
    // GameConfiguration.stateAccessor.setStateObject({
    //   message: 'This is a dummy message!',
    //   note: 'The game is not doing anything yet, so there is currently no real data.',
    //   gameStartTime: formatDate(new Date(), 'on ddd, mmm dd yyyy, at hh:ii:ss'),
    // });
  }

  override step(time: number, delta: number): void {
    const pointer = this.input.activePointer;
    GameInputPointer.x = pointer.x;
    GameInputPointer.y = pointer.y;
    GameInputPointer.button = pointer.button;
    GameInputPointer.isDown = pointer.isDown;
    GameInputPointer.alreadyHandled = false;
    try {
      Phaser.Game.prototype.step.call(this, time, delta);
    } catch (err: unknown) {
      GameConfiguration.gameReactions.reactToError(err as Error);
    }
  }

  private static getScenes = (): Array<Phaser.Scene> => {
    return [
      new StartupScene(),
      new InitialLoaderScene(),
      new StoryPlayScene(),
      new DialogWindowsScene(),
      new CriticalErrorScene(),
      new CursorScene(),
    ];
  };
}
