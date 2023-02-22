import { View } from './_view';
import { SaveLoadParameters } from './types';
import { IWindowController } from '../_IWindowController';
import { BehaviorModel, DataModel } from './_types';

class Controller implements IWindowController {
  public view?: View;

  public createDialogWindow(
    scene: Phaser.Scene,
    p: unknown,
    onDestroy: () => void
  ) {
    const parameters = p as SaveLoadParameters;
    const callbackClose = parameters.callbackClose ?? (() => {});
    const dataModel: DataModel = {
      buttonTextClose: parameters.buttonTextClose ?? 'Close',
      title: parameters.title ?? 'Save/Load!',
    };
    const behaviorModel: BehaviorModel = {
      onButtonClickClose: () => {
        this.destroy();
        onDestroy();
        callbackClose();
      },
    };
    this.view = new View(scene, dataModel, behaviorModel);
  }

  public destroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}

export { Controller };
