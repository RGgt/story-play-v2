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
    const callbackYes = parameters.callbackYes ?? (() => {});
    const callbackNo = parameters.callbackNo ?? (() => {});
    const dataModel: DataModel = {
      buttonTextYes: GameConfiguration.getUITranslation(
        parameters.buttonTextYes ?? 'MessageBoxYesNo.yesButton'
      ),
      buttonTextNo: GameConfiguration.getUITranslation(
        parameters.buttonTextNo ?? 'MessageBoxYesNo.noButton'
      ),
      message: parameters.message,
      title: GameConfiguration.getUITranslation(
        parameters.title ?? 'MessageBoxYesNo.title'
      ),
      width: parameters.width ?? 1000,
    };
    const behaviorModel: BehaviorModel = {
      onButtonClickYes: () => {
        this.destroy();
        onDestroy();
        callbackYes();
      },
      onButtonClickNo: () => {
        this.destroy();
        onDestroy();
        callbackNo();
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
