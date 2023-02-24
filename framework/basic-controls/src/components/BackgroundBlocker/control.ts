import {
  GameConfiguration,
  ECursorOptions,
  GameInputPointer,
  SPAwareControl,
} from '@rggt/game-base';
import { BackgroundBlockerStyle } from './types';

type BackgroundBlockerConfig = {
  holeX: number;
  holeY: number;
  holeWidth: number;
  holeHeight: number;
  fillAlpha: number;
  fillColor: number;
  reactionToClick?: (x: number, y: number) => void;
};

const defaultOptions: BackgroundBlockerConfig = {
  holeX: 0,
  holeY: 0,
  holeWidth: 1920,
  holeHeight: 1080,
  fillAlpha: 0.25,
  fillColor: 0x00,
  reactionToClick: undefined,
};

class BackgroundBlocker
  extends Phaser.GameObjects.Rectangle
  implements SPAwareControl
{
  protected _bounds: Phaser.Geom.Rectangle;

  protected _lPressed = false;

  public reactToClick?: (x: number, y: number) => void;

  constructor(scene: Phaser.Scene, style: BackgroundBlockerStyle) {
    const fillColor = style.fillColor ?? defaultOptions.fillColor;
    const fillAlpha = style.fillAlpha ?? defaultOptions.fillAlpha;
    const reactionToClick =
      style.reactionToClick ?? defaultOptions.reactionToClick;
    super(scene, 0, 0, 1920, 1080, fillColor, fillAlpha);
    this._bounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1080);
    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this.reactToClick = reactionToClick;
    this.setOrigin(0, 0);
  }

  public processSPInput() {
    // Check if the cursor is over the component
    if (
      !GameInputPointer.alreadyHandled &&
      this._bounds.contains(GameInputPointer.x, GameInputPointer.y)
    ) {
      if (!this._bounds.contains(GameInputPointer.x, GameInputPointer.y)) {
        this.setActiveCursor();
        if (GameInputPointer.button === 0 && GameInputPointer.isDown) {
          this._lPressed = true;
        } else {
          if (this._lPressed && this.reactToClick) {
            this.reactToClick(GameInputPointer.x, GameInputPointer.y);
          }
          this._lPressed = false;
        }
      } else {
        this._lPressed = false;
      }
      // GameInputPointer.alreadyHandled = true;
    } else {
      this._lPressed = false;
    }
  }

  setActiveCursor() {
    if (!this.scene.game) return;
    if (!this.reactToClick) return;
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
export { BackgroundBlocker };
