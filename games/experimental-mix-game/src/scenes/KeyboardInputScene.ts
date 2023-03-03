import { GameInputPointer } from '@rggt/game-base';
import EScenes from './EScenes';

export default class KeyboardInputScene extends Phaser.Scene {
  constructor() {
    super(EScenes.KeyboardInput);
  }

  private _lastKeyAutoForwardTime = 0;

  private _lastKeyAutoBackwardTime = 0;

  private _autoForwardKeys = [] as Phaser.Input.Keyboard.Key[];

  private _autoBackwardKeys = [] as Phaser.Input.Keyboard.Key[];

  create() {
    const keyAutoForward01 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    const keyAutoForward02 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    const keyAutoBackward01 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this._autoForwardKeys = [];
    if (keyAutoForward01) this._autoForwardKeys.push(keyAutoForward01);
    if (keyAutoForward02) this._autoForwardKeys.push(keyAutoForward02);
    if (keyAutoBackward01) this._autoBackwardKeys.push(keyAutoBackward01);
  }

  private _checkKeyAutoForward(time: number) {
    // Assume no auto-forward key is pressed
    GameInputPointer.keyAutoForward = false;
    if (time - this._lastKeyAutoForwardTime < 200) return;
    const pressedKey = this._autoForwardKeys.find((key) =>
      this.input.keyboard.checkDown(key, 0)
    );
    if (!pressedKey) return;
    this._lastKeyAutoForwardTime = time;
    GameInputPointer.keyAutoForward = true;
  }

  private _checkKeyAutoBackward(time: number) {
    // Assume no auto-forward key is pressed
    GameInputPointer.keyAutoBackward = false;
    if (time - this._lastKeyAutoBackwardTime < 200) return;
    const pressedKey = this._autoBackwardKeys.find((key) =>
      this.input.keyboard.checkDown(key, 0)
    );
    if (!pressedKey) return;
    this._lastKeyAutoBackwardTime = time;
    GameInputPointer.keyAutoBackward = true;
  }

  override update(time: number, delta: number): void {
    this._checkKeyAutoForward(time);
    this._checkKeyAutoBackward(time);
  }
}
