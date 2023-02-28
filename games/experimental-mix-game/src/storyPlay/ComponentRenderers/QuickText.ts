import { createDialogText } from '@rggt/basic-controls';
/**
 * Like LargeTextRenderer, but without translations
 */
class QuickText {
  constructor(private scene: Phaser.Scene) {}

  private _quickText?: {
    text: Phaser.GameObjects.Text;
    destroy: () => void;
  };

  renderQuickText(data: string, index: number) {
    if (data == null) {
      this._quickText?.destroy();
      return;
    }
    if (this._quickText) {
      this._quickText?.destroy();
    }
    this._quickText = this._placeQuick(this.scene, data);
    this._quickText?.text.setDepth(index * 10);
  }

  private _placeQuick(scene: Phaser.Scene, text: string) {
    const customComponent = createDialogText(scene, {
      x: 32,
      y: 32,
      text,
      maxWidth: 1920,
    });
    scene.add.existing(customComponent.text);
    return customComponent;
  }

  cleanup() {
    this._quickText?.destroy();
  }
}
export { QuickText };
