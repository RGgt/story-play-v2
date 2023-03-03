import {
  GameConfiguration,
  ECursorOptions,
  GameInputPointer,
  SPAwareControl,
  CommonWindowStyles,
  JumperStyle,
} from '@rggt/game-base';
import { JumperOptions } from './types';

type JumperConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  reactionToAdvance: () => void;
  reactionToReturn: () => void;
  reactionToMenu: () => void;
};

const defaultOptions: JumperConfig = {
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
  reactionToAdvance: () => {},
  reactionToReturn: () => {},
  reactionToMenu: () => {},
};

class Jumper extends Phaser.GameObjects.Rectangle implements SPAwareControl {
  public reactionToAdvance: () => void;

  public reactionToReturn: () => void;

  public reactionToMenu: () => void;

  protected _bounds: Phaser.Geom.Rectangle;

  protected _lPressed = false;

  constructor(scene: Phaser.Scene, options: JumperOptions) {
    const fillColor = 0xffffff;
    const fillAlpha = 0.0;
    const x = options.x ?? defaultOptions.x;
    const y = options.y ?? defaultOptions.y;
    const width = options.width ?? defaultOptions.width;
    const height = options.height ?? defaultOptions.height;
    const reactionToAdvance =
      options.reactionToAdvance ?? defaultOptions.reactionToAdvance;
    const reactionToReturn =
      options.reactionToReturn ?? defaultOptions.reactionToReturn;
    const reactionToMenu =
      options.reactionToMenu ?? defaultOptions.reactionToMenu;
    super(scene, x, y, width, height, fillColor, fillAlpha);
    this._bounds = new Phaser.Geom.Rectangle(x, y, width, height);
    this.reactionToAdvance = reactionToAdvance;
    this.reactionToReturn = reactionToReturn;
    this.reactionToMenu = reactionToMenu;
    this.setOrigin(0, 0);
  }

  public processSPInput() {
    if (!this.visible) return;
    if (!this._bounds) return;

    if (!GameInputPointer.alreadyHandled) {
      if (GameInputPointer.keyAutoForward) {
        if (this.reactionToAdvance) {
          GameInputPointer.alreadyHandled = true;
          this.reactionToAdvance();
          return;
        }
      }
      if (GameInputPointer.keyAutoBackward) {
        if (this.reactionToReturn) {
          GameInputPointer.alreadyHandled = true;
          this.reactionToReturn();
          return;
        }
      }
    }
    // Check if the cursor is over the component
    if (
      !GameInputPointer.alreadyHandled &&
      this._bounds.contains(GameInputPointer.x, GameInputPointer.y)
    ) {
      this.setActiveCursor();
      if (GameInputPointer.button === 0 && GameInputPointer.isDown) {
        this._lPressed = true;
      } else {
        if (this._lPressed) {
          if (
            GameInputPointer.x >
              CommonWindowStyles.screen.width - JumperStyle.menuAreaWidth &&
            GameInputPointer.y < JumperStyle.menuAreaHeight
          ) {
            if (this.reactionToMenu) this.reactionToMenu();
            // click on hidden menu button, top right of the screen
          } else if (GameInputPointer.x < JumperStyle.leftBarWidth) {
            // click on hidden nav-back on the left side of the screen
            if (this.reactionToReturn) this.reactionToReturn();
          } else {
            // click in the main area
            // eslint-disable-next-line no-lonely-if
            if (this.reactionToAdvance) this.reactionToAdvance();
          }
        }
        this._lPressed = false;
      }
      GameInputPointer.alreadyHandled = true;
    } else {
      this._lPressed = false;
    }
  }

  public setActiveCursor() {
    if (!this.scene.game) return;
    GameConfiguration.gameReactions.reactToCursorOption(
      ECursorOptions.CanClick
    );
  }

  public onDestroy = () => {};

  public destroy(): void {
    this.onDestroy();
    super.destroy(true);
  }
}
export { Jumper };
