import {
  BackgroundBlocker,
  createBackgroundBlocker,
} from '@rggt/basic-controls';
import { CommonWindowStyles } from '@rggt/game-base';
import Phaser from 'phaser';
import { createWindowController } from './_createWindowController';

class DialogsManager {
  private _backgroundBlocker?: BackgroundBlocker;

  private _blockersCount = 0;

  public constructor(protected scene: Phaser.Scene) {
    // code goes here
  }

  private addBackgroundBlocker() {
    if (this._backgroundBlocker) {
      this._blockersCount += 1;
    } else {
      this._backgroundBlocker = createBackgroundBlocker(this.scene, {
        fillAlpha: CommonWindowStyles.backgroundBlockerAlpha,
        fillColor: CommonWindowStyles.backgroundBlockerColor,
        reactionToClick: undefined,
      });
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

  private bringBackgroundBlockerToFront() {
    if (this._backgroundBlocker) {
      this._backgroundBlocker.destroy();
      this._backgroundBlocker = createBackgroundBlocker(this.scene, {
        fillAlpha: CommonWindowStyles.backgroundBlockerAlpha,
        fillColor: CommonWindowStyles.backgroundBlockerColor,
        reactionToClick: undefined,
      });
      this._backgroundBlocker.depth = -10;
    }
  }

  public async createDialog(windowTypeCode: string, windowParameters: unknown) {
    const controller = createWindowController(windowTypeCode);
    this.addBackgroundBlocker();

    this.bringBackgroundBlockerToFront();

    await controller.createDialogWindow(
      this.scene,
      windowParameters,
      this.destroy.bind(this),
      this.notifyControlsRecreated.bind(this)
    );
  }

  private notifyControlsRecreated() {
    this.bringBackgroundBlockerToFront();
  }

  private destroy() {
    this.removeBackgroundBlocker();
  }
}
export { DialogsManager };
