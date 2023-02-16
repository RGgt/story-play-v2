import { DialogLifetimeController } from '@rggt/game-base';
import { BehaviorModel, DataModel } from './_types';
import { View } from './view';
import { MessageBoxParameters } from './types';

class Controller implements DialogLifetimeController {
  public dataModel: DataModel;

  public behaviorModel: BehaviorModel;

  public view?: View;

  public constructor(
    public scene: Phaser.Scene,
    parameters: MessageBoxParameters
  ) {
    const callback = parameters.callback ?? (() => {});
    this.dataModel = {
      buttonText: parameters.ButtonText ?? 'Ok',
      message: parameters.message,
      title: parameters.title ?? 'Attention!',
      width: parameters.width ?? 1000,
    };
    this.behaviorModel = {
      onButtonClick: () => {
        this.destroy();
        callback();
      },
    };
  }

  public createDialog() {
    this.view = new View(this.scene, this.dataModel, this.behaviorModel);
    // code here
  }

  public destroy() {
    if (this.view) {
      this.view.destroy();
    }
    // code
  }
}

export { Controller };
