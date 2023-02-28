import {
  createSubtitleTextAlignCenter,
  createTitleText,
} from '@rggt/basic-controls';
import { CommonWindowStyles, GameConfiguration } from '@rggt/game-base';

class LargeTextsRenderer {
  constructor(private scene: Phaser.Scene) {}

  private _StoryTitle?: {
    text: Phaser.GameObjects.Text;
    destroy: () => void;
  };

  private _StorySubtitle_1?: {
    text: Phaser.GameObjects.Text;
    destroy: () => void;
  };

  renderStoryTitle(data: string, index: number) {
    if (data == null) {
      this._StoryTitle?.destroy();
      return;
    }
    if (this._StoryTitle) {
      this._StoryTitle?.destroy();
    }
    const text = GameConfiguration.getTranslation(data);
    this._StoryTitle = this._placeGameTitleText(this.scene, text);
    this._StoryTitle?.text.setDepth(index * 10);
  }

  renderStorySubtitleCenter(data: string, index: number) {
    if (data == null) {
      this._StorySubtitle_1?.destroy();
      return;
    }
    if (this._StorySubtitle_1) {
      this._StorySubtitle_1?.destroy();
    }
    const text = GameConfiguration.getTranslation(data);
    const screenCenterY = CommonWindowStyles.screen.centerY;
    let y = screenCenterY;
    if (this._StoryTitle) {
      y = this._StoryTitle.text.getBottomCenter().y + 40;
    }
    const customComponent = this._placeGameSubtitleCenterText(
      this.scene,
      text,
      y
    );
    this._StorySubtitle_1 = customComponent;
    this._StorySubtitle_1?.text.setDepth(index * 10);
  }

  private _placeGameTitleText(scene: Phaser.Scene, text: string) {
    const screenCenterX =
      scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const screenCenterY =
      scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
    const customComponent = createTitleText(scene, {
      x: screenCenterX,
      y: screenCenterY,
      text,
      maxWidth: 1920,
    });
    scene.add.existing(customComponent.text);
    return customComponent;
  }

  private _placeGameSubtitleCenterText(
    scene: Phaser.Scene,
    text: string,
    y: number
  ) {
    const screenCenterX =
      scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
    const customComponent = createSubtitleTextAlignCenter(scene, {
      x: screenCenterX,
      y,
      text,
      maxWidth: 1920,
    });
    scene.add.existing(customComponent.text);
    return customComponent;
  }

  cleanup() {
    this._StorySubtitle_1?.destroy();
    this._StoryTitle?.destroy();
  }
}
export { LargeTextsRenderer };
