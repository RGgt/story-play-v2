import { GameInputPointer } from '@rggt/game-base';
import EScenes from './EScenes';

export default class KeyboardInputScene extends Phaser.Scene {
  constructor() {
    super(EScenes.KeyboardInput);
  }

  private _lastKeyAutoForwardTime = 0;

  private _lastKeyAutoBackwardTime = 0;

  private _lastKeyTurnFullScreenTime = 0;

  private _autoForwardKeys = [] as Phaser.Input.Keyboard.Key[];

  private _autoBackwardKeys = [] as Phaser.Input.Keyboard.Key[];

  private _turnFullScreenKeys = [] as Phaser.Input.Keyboard.Key[];

  create() {
    const keyAutoForward01 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );
    const keyAutoForward02 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    if (keyAutoForward01) this._autoForwardKeys.push(keyAutoForward01);
    if (keyAutoForward02) this._autoForwardKeys.push(keyAutoForward02);
    const keyAutoBackward01 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    if (keyAutoBackward01) this._autoBackwardKeys.push(keyAutoBackward01);
    const keyToggleFullScreen01 = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.F
    );
    if (keyToggleFullScreen01)
      this._turnFullScreenKeys.push(keyToggleFullScreen01);
  }

  private _checkKeyAutoForward(time: number) {
    // Assume no auto-forward key is not pressed
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
    // Assume no auto-backward key is not pressed
    GameInputPointer.keyAutoBackward = false;
    if (time - this._lastKeyAutoBackwardTime < 200) return;
    const pressedKey = this._autoBackwardKeys.find((key) =>
      this.input.keyboard.checkDown(key, 0)
    );
    if (!pressedKey) return;
    this._lastKeyAutoBackwardTime = time;
    GameInputPointer.keyAutoBackward = true;
  }

  private _checkKeyTurnFullScreen(time: number) {
    // Assume no auto-forward key is not pressed
    if (time - this._lastKeyTurnFullScreenTime < 200) return;
    const pressedKey = this._turnFullScreenKeys.find((key) =>
      this.input.keyboard.checkDown(key, 0)
    );
    if (!pressedKey) return;
    this._lastKeyTurnFullScreenTime = time;
    if (document.fullscreenElement) {
      return;
    }
    this._openHtmlModalToTurnFullscreenOn();
  }

  private _openHtmlModalToTurnFullscreenOn = () => {
    // Create the modal window
    const dialog = document.getElementById(
      'dlgTurnFullscreen'
    ) as HTMLDialogElement;
    const cancelButton = document.getElementById('cancel') as HTMLButtonElement;
    const confirmButton = document.getElementById(
      'confirm'
    ) as HTMLButtonElement;
    // Close on dialog NO
    cancelButton.addEventListener('click', () => {
      dialog.close('NO');
      dialog.classList.remove('dialog-visible');
      dialog.classList.add('dialog-hidden');
      this.game.canvas.focus();
      this.scene.resume();
    });
    // Turn Fullscreen on on YES
    confirmButton.addEventListener('click', (event) => {
      event.preventDefault();
      dialog.close('YES');
      dialog.classList.remove('dialog-visible');
      dialog.classList.add('dialog-hidden');
      this.scene.resume();
      this.game.canvas.focus();
      this._fullScreenOn();
    });
    this.scene.pause();
    dialog.classList.add('dialog-visible');
    dialog.classList.remove('dialog-hidden');
    dialog.showModal();
  };

  private _fullScreenOn() {
    if (!document.fullscreenElement) {
      this.game.canvas.focus();
      this.game.canvas.requestFullscreen({ navigationUI: 'hide' }).catch(() => {
        document.exitFullscreen();
      });
    }
  }

  override update(time: number, delta: number): void {
    this._checkKeyAutoForward(time);
    this._checkKeyAutoBackward(time);
    this._checkKeyTurnFullScreen(time);
  }
}
