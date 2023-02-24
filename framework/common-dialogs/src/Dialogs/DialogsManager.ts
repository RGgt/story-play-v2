import {
  BackgroundBlocker,
  createBackgroundBlocker,
} from '@rggt/basic-controls';
import { CommonWindowStyles } from '@rggt/game-base';
import Phaser from 'phaser';
import { createWindowController } from './_createWindowController';

class DialogsManager {
  private _backgroundBlockers: BackgroundBlocker[] = [];

  public constructor(protected scene: Phaser.Scene) {}

  private addBackgroundBlocker() {
    const backgroundBlocker = createBackgroundBlocker(this.scene, {
      fillAlpha: CommonWindowStyles.backgroundBlockerAlpha,
      fillColor: CommonWindowStyles.backgroundBlockerColor,
      reactionToClick: undefined,
    });
    this._backgroundBlockers.forEach((bb) => bb.setVisible(false));
    this._backgroundBlockers.push(backgroundBlocker);
  }

  private removeBackgroundBlocker() {
    const backgroundBlocker = this._backgroundBlockers.pop();
    if (backgroundBlocker) backgroundBlocker.destroy();
    if (this._backgroundBlockers.length > 0) {
      this._backgroundBlockers[this._backgroundBlockers.length - 1].setVisible(
        true
      );
    }
  }

  public async createDialog(windowTypeCode: string, windowParameters: unknown) {
    const controller = createWindowController(windowTypeCode);
    this.addBackgroundBlocker();

    await controller.createDialogWindow(
      this.scene,
      windowParameters,
      this.removeBackgroundBlocker.bind(this)
    );
  }

  public destroy() {
    while (this._backgroundBlockers.length > 0) {
      this.removeBackgroundBlocker();
    }
  }
}
export { DialogsManager };
