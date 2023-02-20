import { CommonWindowStyles } from '@rggt/game-base';
import Phaser from 'phaser';
import { createWindowController } from './_createWindowController';

class DialogsManager {
  private _backgroundBlocker?: Phaser.GameObjects.Rectangle;

  private _blockersCount = 0;

  public constructor(protected scene: Phaser.Scene) {
    // code goes here
  }

  private addBackgroundBlocker() {
    if (this._backgroundBlocker) {
      this._blockersCount += 1;
    } else {
      this._backgroundBlocker = this.scene.add.rectangle(
        0,
        0,
        CommonWindowStyles.screen.width,
        CommonWindowStyles.screen.height,
        CommonWindowStyles.backgroundBlockerColor,
        CommonWindowStyles.backgroundBlockerAlpha
      );
      this._backgroundBlocker.setOrigin(0, 0);
      this.scene.add.existing(this._backgroundBlocker);
      this._blockersCount = 1;
    }
  }

  private removeBackgroundBlocker() {
    if (this._blockersCount > 0) {
      this._blockersCount -= 1;
    }
    if (this._blockersCount === 0) {
      if (this._backgroundBlocker) this._backgroundBlocker.destroy();
      this._backgroundBlocker = undefined;
    }
  }

  public createDialog(windowTypeCode: string, windowParameters: unknown) {
    const controller = createWindowController(windowTypeCode);
    this.addBackgroundBlocker();

    controller.createDialogWindow(
      this.scene,
      windowParameters,
      this.destroy.bind(this)
    );
  }

  private destroy() {
    this.removeBackgroundBlocker();
  }
}
export { DialogsManager };
