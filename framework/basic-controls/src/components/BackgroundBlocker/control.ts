import {
  GameConfiguration,
  ECursorOptions,
  GameInputPointer,
} from '@rggt/game-base';
import { BackgroundBlockerStyle } from './types';

type BackgroundBlockerConfig = {
  holeX: number;
  holeY: number;
  holeWidth: number;
  holeHeight: number;
  fillAlpha: number;
  fillColor: number;
  reactionToClick: () => void;
};

const defaultOptions: BackgroundBlockerConfig = {
  holeX: 0,
  holeY: 0,
  holeWidth: 1920,
  holeHeight: 1080,
  fillAlpha: 0.25,
  fillColor: 0x00,
  reactionToClick: () => console.log('clicked'),
};

class BackgroundBlocker extends Phaser.GameObjects.Rectangle {
  protected _holeBounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1080);

  protected _bounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1080);

  protected _lPressed = false;

  private onClick: () => void;

  constructor(scene: Phaser.Scene, style: BackgroundBlockerStyle) {
    const fillColor = style.fillColor ?? defaultOptions.fillColor;
    const fillAlpha = style.fillAlpha ?? defaultOptions.fillAlpha;
    const holeX = style.holeX ?? defaultOptions.holeX;
    const holeY = style.holeY ?? defaultOptions.holeY;
    const holeWidth = style.holeWidth ?? defaultOptions.holeWidth;
    const holeHeight = style.holeHeight ?? defaultOptions.holeHeight;
    const reactionToClick =
      style.reactionToClick ?? defaultOptions.reactionToClick;
    super(scene, 0, 0, 1920, 1080, fillColor, fillAlpha);
    this._holeBounds = new Phaser.Geom.Rectangle(
      holeX,
      holeY,
      holeWidth,
      holeHeight
    );
    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this.onClick = reactionToClick;
    this.setOrigin(0, 0);
    //TODO: remove
    const fill = scene.add.graphics();

    fill.fillStyle(0x00ffff, 1);
    fill.fillRect(holeX, holeY, holeWidth, holeHeight);
    //TODO: /remove
  }

  preUpdate() {
    if (!this._holeBounds) return;

    // Check if the cursor is over the component
    if (
      !GameInputPointer.alreadyHandled &&
      this._bounds.contains(GameInputPointer.x, GameInputPointer.y)
    ) {
      if (!this._holeBounds.contains(GameInputPointer.x, GameInputPointer.y)) {
        this.setActiveCursor();
        if (GameInputPointer.button === 0 && GameInputPointer.isDown) {
          this._lPressed = true;
        } else {
          if (this._lPressed && this.onClick) {
            this.onClick();
          }
          this._lPressed = false;
        }
      } else {
        this._lPressed = false;
      }
      GameInputPointer.alreadyHandled = true;
    } else {
      this._lPressed = false;
    }
  }

  setActiveCursor() {
    if (!this.scene.game) return;
    if (!this.onClick) return;
    GameConfiguration.gameReactions.reactToCursorOption(
      ECursorOptions.CanClick
    );
  }
}
export { BackgroundBlocker };
