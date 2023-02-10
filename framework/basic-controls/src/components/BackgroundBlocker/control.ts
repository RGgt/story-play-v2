import { GameConfiguration, ECursorOptions } from '@rggt/game-base';
import { BackgroundBlockerStyle } from './types';

type BackgroundBlockerConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  fillAlpha: number;
  fillColor: number;
};

const defaultOptions: BackgroundBlockerConfig = {
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
  fillAlpha: 0.25,
  fillColor: 0x00,
};

class BackgroundBlocker extends Phaser.GameObjects.Rectangle {
  protected _holeBounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1080);

  protected _bounds = new Phaser.Geom.Rectangle(0, 0, 1920, 1080);

  protected _lPressed = false;

  private _onClick: undefined | (() => void);

  public get onClick(): undefined | (() => void) {
    return this._onClick;
  }

  public set onClick(onClick: undefined | (() => void)) {
    this._onClick = onClick;
  }

  constructor(scene: Phaser.Scene, style: BackgroundBlockerStyle) {
    const fillColor = style.fillColor ?? defaultOptions.fillColor;
    const fillAlpha = style.fillAlpha ?? defaultOptions.fillAlpha;
    const x = style.x ?? defaultOptions.x;
    const y = style.y ?? defaultOptions.y;
    const width = style.width ?? defaultOptions.width;
    const height = style.height ?? defaultOptions.height;
    super(scene, 0, 0, 1920, 1080, fillColor, fillAlpha);
    this._holeBounds = new Phaser.Geom.Rectangle(x, y, width, height);
    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this.setOrigin(0, 0);
  }

  preUpdate() {
    if (!this._holeBounds) return;
    // Get the current cursor position
    const pointer = this.scene.input.activePointer;

    // Check if the cursor is over the component
    if (this._bounds.contains(pointer.x, pointer.y)) {
      if (!this._holeBounds.contains(pointer.x, pointer.y)) {
        this.setActiveCursor();
        if (pointer.button === 0 && pointer.isDown) {
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
