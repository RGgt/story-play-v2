import EScenes from './EScenes';

export default class DialogWindowsScene extends Phaser.Scene {
  private _backgroundBlocker: Phaser.GameObjects.Rectangle | undefined;

  constructor() {
    super(EScenes.DialogWindows);
  }

  private ensureBackgroundBlocker() {
    if (!this._backgroundBlocker) {
      this._backgroundBlocker = this.add.rectangle(
        0,
        0,
        1920,
        1080,
        0x000000,
        0.3
      );
      this._backgroundBlocker.setOrigin(0, 0);
      const text = this.add.text(32, 32, 'DialogWindows', {
        fontSize: '32px',
        color: '#ffffff',
      });
      text.setOrigin(0, 0);
    }
  }

  create() {
    this.ensureBackgroundBlocker();
  }
}
