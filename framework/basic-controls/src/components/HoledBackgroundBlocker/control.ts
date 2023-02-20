import {
  GameConfiguration,
  ECursorOptions,
  GameInputPointer,
  DrawDebug,
} from '@rggt/game-base';
import { HoledBackgroundBlockerStyle } from './types';

type HoledBackgroundBlockerConfig = {
  holeX: number;
  holeY: number;
  holeWidth: number;
  holeHeight: number;
  fillAlpha: number;
  fillColor: number;
  reactionToClick: () => void;
};

const defaultOptions: HoledBackgroundBlockerConfig = {
  holeX: 0,
  holeY: 0,
  holeWidth: 1920,
  holeHeight: 1080,
  fillAlpha: 0.25,
  fillColor: 0x00,
  reactionToClick: () => console.log('clicked'),
};

class HoledBackgroundBlocker extends Phaser.GameObjects.Rectangle {
  protected _holeBounds: Phaser.Geom.Rectangle;

  protected _bounds: Phaser.Geom.Rectangle;

  protected _lPressed = false;

  public reactToClick: (x: number, y: number) => void;

  constructor(scene: Phaser.Scene, style: HoledBackgroundBlockerStyle) {
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
    this._bounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1080);
    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this.reactToClick = reactionToClick;
    this.setOrigin(0, 0);
    if (
      import.meta.env.VITE_DRAW_DEBUG_RECTANGLE_FOR_HOLES.toUpperCase() ===
      'YES'
    ) {
      const fill = scene.add.graphics();
      fill.fillStyle(DrawDebug.holes.hole1.color, DrawDebug.holes.hole1.alpha);
      fill.fillRect(holeX, holeY, holeWidth, holeHeight);
    }
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
          if (this._lPressed && this.reactToClick) {
            this.reactToClick(GameInputPointer.x, GameInputPointer.y);
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
    if (!this.reactToClick) return;
    GameConfiguration.gameReactions.reactToCursorOption(
      ECursorOptions.CanClick
    );
  }
}
export { HoledBackgroundBlocker as BackgroundBlocker };
