import { createNarrationText } from '@rggt/basic-controls';
import { GameConfiguration } from '@rggt/game-base';

class NarratorRenderer {
  private _narrationText?: Phaser.GameObjects.Text;

  private _narrationRectangle?: Phaser.GameObjects.Rectangle;

  constructor(private scene: Phaser.Scene) {}

  public renderNarration(data: string, index: number) {
    this._narrationText?.destroy();
    this._narrationRectangle?.destroy();
    if (data == null) {
      return;
    }
    const text = data !== '' ? GameConfiguration.getTranslation(data) : '';
    const [customComponent, rectangle] = this._placeNarrationText(
      this.scene,
      text
    );
    this._narrationRectangle = rectangle;
    this._narrationText = customComponent;
    this._narrationRectangle?.setDepth(index * 10);
    this._narrationText?.setDepth(index * 10 + 5);
  }

  private _placeNarrationText(
    scene: Phaser.Scene,
    text: string
  ): [Phaser.GameObjects.Text, Phaser.GameObjects.Rectangle] {
    const x = 100;
    const y = 1080 - 250;
    const customComponent = createNarrationText(scene, {
      x,
      y,
      text,
      maxWidth: 1920 - 200,
    });
    customComponent.text.setScrollFactor(0, -1);
    const rectangle = scene.add.rectangle(
      0,
      y - 50,
      1920,
      250 + 50,
      0x000000,
      0.65
    );
    rectangle.setOrigin(0, 0);
    scene.add.existing(customComponent.text);
    return [customComponent.text, rectangle];
  }

  public cleanup() {
    this._narrationText?.destroy();
  }
}
export { NarratorRenderer };
