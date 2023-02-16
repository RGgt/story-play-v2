import { View } from './view';
import { MessageBoxParameters } from './types';
import { IWindowController } from '../IWindowController';

class Controller implements IWindowController {
  public view?: View;

  public createDialogWindow(
    scene: Phaser.Scene,
    p: unknown,
    onDestroy: () => void
  ) {
    const parameters = p as MessageBoxParameters;
    const callback = parameters.callback ?? (() => {});
    const dataModel = {
      buttonText: parameters.buttonText ?? 'Ok',
      message: parameters.message,
      title: parameters.title ?? 'Attention!',
      width: parameters.width ?? 1000,
    };
    const behaviorModel = {
      onButtonClick: () => {
        this.destroy();
        onDestroy();
        callback();
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
