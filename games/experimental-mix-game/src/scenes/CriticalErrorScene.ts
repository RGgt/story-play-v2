import EScenes from './EScenes';

export default class CriticalErrorScene extends Phaser.Scene {
  private _errorMessage = '';

  public setErrorMessage(errorMessage: string) {
    this._errorMessage = `Unrecoverable error: \r\n \r\n${errorMessage}\r\n\r\n _`;
    const rectangle = this.add.rectangle(0, 0, 1920, 1080, 0x000000, 0.85);
    rectangle.setOrigin(0, 0);
    const text = this.add.text(960, 540, this._errorMessage, {
      fontSize: '64px',
      color: '#ffffff',
      wordWrap: {
        width: 1920 * 0.6,
        useAdvancedWrap: true,
      },
    });
    text.setOrigin(0.5, 0.5);
  }

  constructor() {
    super(EScenes.CriticalError);
  }

  create() {}
}
