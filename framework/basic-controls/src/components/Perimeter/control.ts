import {
  GameConfiguration,
  ECursorOptions,
  GameInputPointer,
  SPAwareControl,
} from '@rggt/game-base';
import { PerimeterOptions } from './types';

type PerimeterConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  reactionToClick: (x: number, y: number) => void;
};

const defaultOptions: PerimeterConfig = {
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
  reactionToClick: () => {
    console.log('clicked');
  },
};

class Perimeter extends Phaser.GameObjects.Rectangle implements SPAwareControl {
  public reactToClick: (x: number, y: number) => void;

  protected _bounds: Phaser.Geom.Rectangle;

  protected _lPressed = false;

  constructor(scene: Phaser.Scene, options: PerimeterOptions) {
    const fillColor = 0x00ff;
    const fillAlpha = 0.5;
    const x = options.x ?? defaultOptions.x;
    const y = options.y ?? defaultOptions.y;
    const width = options.width ?? defaultOptions.width;
    const height = options.height ?? defaultOptions.height;
    const reactionToClick =
      options.reactionToClick ?? defaultOptions.reactionToClick;
    super(scene, x, y, width, height, fillColor, fillAlpha);
    this._bounds = new Phaser.Geom.Rectangle(x, y, width, height);
    this.reactToClick = reactionToClick;
    this.setOrigin(0, 0);
  }

  public processSPInput() {
    if (!this._bounds) return;

    // Check if the cursor is over the component
    if (
      !GameInputPointer.alreadyHandled &&
      this._bounds.contains(GameInputPointer.x, GameInputPointer.y)
    ) {
      this.setActiveCursor();
      if (GameInputPointer.button === 0 && GameInputPointer.isDown) {
        this._lPressed = true;
      } else {
        if (this._lPressed && this.reactToClick) {
          this.reactToClick(GameInputPointer.x, GameInputPointer.y);
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
export { Perimeter };
