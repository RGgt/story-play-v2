import {
  ECursorOptions,
  GameConfiguration,
  GameInputPointer,
} from '@rggt/game-base';
import { NinePatch, NinePatchData } from '@rggt/nine-patch';
import { ButtonOptions } from './types';

type ButtonConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  disabled: boolean;
  reactionToClick: (x: number, y: number) => void;
};

const defaultOptions: ButtonConfig = {
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
  disabled: false,
  reactionToClick: () => console.log('clicked'),
};

class Button extends NinePatch {
  public Disabled = false;

  /**
   * Pushed means that the button was pressed and remained pressed after that
   * even though it lost focus. So it can act like a toggle of on/off switch.
   */
  public Pushed = false;

  public reactToClick: (x: number, y: number) => void;

  constructor(scene: Phaser.Scene, options: ButtonOptions) {
    const data = new NinePatchData(
      'btnNormal',
      [
        'btnHover',
        'btnPressed',
        'btnDisabled',
        'btnPushed',
        'btnDisabledPushed',
      ],
      310,
      60,
      8,
      8
    );
    const x = options.x ?? defaultOptions.x;
    const y = options.y ?? defaultOptions.y;
    const width = options.width ?? defaultOptions.width;
    const height = options.height ?? defaultOptions.height;
    const disabled = options.disabled ?? defaultOptions.disabled;
    const reactionToClick =
      options.reactionToClick ?? defaultOptions.reactionToClick;
    super(data, scene);
    this.init(x, y, width, height);
    this.reactToClick = reactionToClick;
    this.Disabled = disabled;
  }

  private _lPressed = false;

  preUpdate() {
    if (!this._bounds) return;

    // Check if the cursor is over the component
    if (this.Disabled) {
      this._lPressed = false;
      this.setTexture(this.Pushed ? 'btnDisabledPushed' : 'btnDisabled');
    } else if (
      !GameInputPointer.alreadyHandled &&
      this._bounds.contains(GameInputPointer.x, GameInputPointer.y)
    ) {
      this.setActiveCursor();
      if (GameInputPointer.button === 0 && GameInputPointer.isDown) {
        this._lPressed = true;
        this.setTexture(this.Pushed ? 'btnHover' : 'btnPressed');
      } else {
        if (this._lPressed && this.reactToClick)
          this.reactToClick(GameInputPointer.x, GameInputPointer.y);
        this._lPressed = false;
        this.setTexture(this.Pushed ? 'btnPressed' : 'btnHover');
      }
    } else {
      this.setTexture(this.Pushed ? 'btnPushed' : 'btnNormal');
      this._lPressed = false;
    }
  }

  setActiveCursor() {
    GameConfiguration.gameReactions.reactToCursorOption(
      ECursorOptions.CanClick
    );
  }
}
export { Button };
