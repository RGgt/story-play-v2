import { ECursorOptions } from '@rggt/game-base';
import EScenes from './EScenes';

export default class CursorScene extends Phaser.Scene {
  private _isCursorEnabled = false;

  private _isUsingEnabledTexture = false;

  private _sprite?: Phaser.GameObjects.Sprite;

  private setEnabled() {
    this._isCursorEnabled = true;
  }

  constructor() {
    super(EScenes.Cursor);
  }

  create() {
    this._sprite = this.add.sprite(0, 0, 'cursor_disabled');
    this._sprite.setOrigin(0, 0);
    this._isUsingEnabledTexture = false;
  }

  override update(time: number, delta: number): void {
    if (!this._sprite) return;
    const pointer = this.input.activePointer;
    this._sprite?.setPosition(pointer.x, pointer.y);

    if (this._isCursorEnabled) {
      if (!this._isUsingEnabledTexture) {
        this._sprite.setTexture('cursor_enabled');
        this._isUsingEnabledTexture = true;
      }
    } else if (this._isUsingEnabledTexture) {
      this._sprite.setTexture('cursor_disabled');
      this._isUsingEnabledTexture = false;
    }
    this._isCursorEnabled = false;
    super.update(time, delta);
  }

  reactToCursorOption(cursorOption: string) {
    switch (cursorOption) {
      case ECursorOptions.CanClick:
        this.setEnabled();
        break;
      default:
        throw new Error('Invalid cursor option!');
    }
  }
}
