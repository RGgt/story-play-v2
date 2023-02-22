import {
  ECursorOptions,
  GameConfiguration,
  GameInputPointer,
} from '@rggt/game-base';
import { HighlightableOptions } from './types';

type HighlightableConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  fillAlphaInactive: number;
  fillColorInactive: number;
  fillAlphaHovered: number;
  fillColorHovered: number;
  fillAlphaActive: number;
  fillColorActive: number;
  reactionToClick?: (x: number, y: number) => void;
};

const defaultOptions: HighlightableConfig = {
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
  fillAlphaInactive: 0.0, // alpha inactive
  fillColorInactive: 0xffbf00, // color inactive
  fillAlphaHovered: 0.125, // alpha hovered
  fillColorHovered: 0xffbf00, // color hovered
  fillAlphaActive: 0.175, // alpha inactive
  fillColorActive: 0xffbf00, // color inactive
  reactionToClick: undefined,
};

class Highlightable extends Phaser.GameObjects.Rectangle {
  fillColorInactive: number;

  fillAlphaInactive: number;

  fillColorHovered: number;

  fillAlphaHovered: number;

  fillAlphaActive: number;

  fillColorActive: number;

  protected _bounds: Phaser.Geom.Rectangle;

  protected _lPressed = false;

  public reactToClick?: (x: number, y: number) => void;

  constructor(scene: Phaser.Scene, options: HighlightableOptions) {
    const x = options.x ?? defaultOptions.x;
    const y = options.y ?? defaultOptions.y;
    const width = options.width ?? defaultOptions.width;
    const height = options.height ?? defaultOptions.height;
    const fillColorInactive =
      options.fillColorInactive ?? defaultOptions.fillColorInactive;
    const fillAlphaInactive =
      options.fillAlphaInactive ?? defaultOptions.fillAlphaInactive;
    const fillColorHovered =
      options.fillColorHovered ?? defaultOptions.fillColorHovered;
    const fillAlphaHovered =
      options.fillAlphaHovered ?? defaultOptions.fillAlphaHovered;
    const fillColorActive =
      options.fillColorActive ?? defaultOptions.fillColorActive;
    const fillAlphaActive =
      options.fillAlphaActive ?? defaultOptions.fillAlphaActive;
    const reactionToClick =
      options.reactionToClick ?? defaultOptions.reactionToClick;

    super(scene, x, y, width, height, fillColorInactive, fillAlphaInactive);
    this._bounds = new Phaser.Geom.Rectangle(x, y, width, height);
    this.fillColor = fillColorInactive;
    this.fillAlpha = fillAlphaInactive;
    this.fillColorInactive = fillColorInactive;
    this.fillAlphaInactive = fillAlphaInactive;
    this.fillColorHovered = fillColorHovered;
    this.fillAlphaHovered = fillAlphaHovered;
    this.fillColorActive = fillColorActive;
    this.fillAlphaActive = fillAlphaActive;
    this.setOrigin(0, 0);
    this.reactToClick = reactionToClick;
  }

  preUpdate() {
    if (!this._bounds) return;

    // Check if the cursor is over the component
    if (
      !GameInputPointer.alreadyHandled &&
      this._bounds.contains(GameInputPointer.x, GameInputPointer.y)
    ) {
      this.setActiveCursor();
      this.fillAlpha = this.fillAlphaHovered;
      this.fillColor = this.fillColorHovered;
      if (GameInputPointer.button === 0 && GameInputPointer.isDown) {
        this._lPressed = true;
        this.fillColor = this.fillColorActive;
        this.fillAlpha = this.fillAlphaActive;
      } else {
        if (this._lPressed && this.reactToClick) {
          this.reactToClick(GameInputPointer.x, GameInputPointer.y);
        }
        this._lPressed = false;
      }
      GameInputPointer.alreadyHandled = true;
    } else {
      this.fillColor = this.fillColorInactive;
      this.fillAlpha = this.fillAlphaInactive;
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

  override setActive(value: boolean): this {
    this.fillColor = this.fillColorInactive;
    this.fillAlpha = this.fillAlphaInactive;
    super.setActive(value);
    return this;
  }

  public destroy(): void {
    super.destroy(true);
  }
}
export { Highlightable };
