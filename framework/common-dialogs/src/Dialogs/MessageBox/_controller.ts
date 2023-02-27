import { GameConfiguration } from '@rggt/game-base';
import { View } from './_view';
import { MessageBoxParameters } from './types';
import { IWindowController } from '../_IWindowController';
import { BehaviorModel, DataModel } from './_types';

class Controller implements IWindowController {
  public view?: View;

  public async createDialogWindow(
    scene: Phaser.Scene,
    p: unknown,
    onDestroy: () => void
  ) {
    const parameters = p as MessageBoxParameters;
    const callback = parameters.callback ?? (() => {});
    const dataModel: DataModel = {
      buttonText: GameConfiguration.getUITranslation(
        parameters.buttonText ?? 'MessageBox.button'
      ),
      message: parameters.message,
      title: GameConfiguration.getUITranslation(
        parameters.title ?? 'MessageBox.title'
      ),
      width: parameters.width ?? 1000,
    };
    const behaviorModel: BehaviorModel = {
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
