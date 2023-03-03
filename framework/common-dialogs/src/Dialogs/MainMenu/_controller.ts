import { GameConfiguration } from '@rggt/game-base';
import { View } from './_view';
import { MainMenuParameters } from './types';
import { IWindowController } from '../_IWindowController';
import { DataModel } from './_types';

class Controller implements IWindowController {
  public view?: View;

  public async createDialogWindow(
    scene: Phaser.Scene,
    p: unknown,
    onDestroy: () => void
  ) {
    const parameters = p as MainMenuParameters;

    const callbackResume = parameters.callbackResume ?? (() => {});
    const callbackNew = parameters.callbackNew ?? (() => {});
    const callbackSaveLoad = parameters.callbackSaveLoad ?? (() => {});
    const callbackPreferences = parameters.callbackPreferences ?? (() => {});
    const dataModel: DataModel = {
      title: GameConfiguration.getUITranslation(
        parameters.title ?? 'MainMenu.title'
      ),
      buttonTextResume: GameConfiguration.getUITranslation(
        parameters.buttonTextResume ?? 'MainMenu.resumeButton'
      ),
      buttonTextNew: GameConfiguration.getUITranslation(
        parameters.buttonTextNew ?? 'MainMenu.newButton'
      ),
      buttonTextSaveLoad: GameConfiguration.getUITranslation(
        parameters.buttonTextSaveLoad ?? 'MainMenu.saveLoadButton'
      ),
      buttonTextPreferences: GameConfiguration.getUITranslation(
        parameters.buttonTextPreferences ?? 'MainMenu.preferencesButton'
      ),
      callbackResume: () => {
        this.destroy();
        onDestroy();
        callbackResume();
      },
      callbackNew: () => {
        this.destroy();
        onDestroy();
        callbackNew();
      },
      callbackSaveLoad: () => {
        this.destroy();
        onDestroy();
        callbackSaveLoad();
      },
      callbackPreferences: () => {
        this.destroy();
        onDestroy();
        callbackPreferences();
      },
    };
    this.view = new View(scene, dataModel);
  }

  public destroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}

export { Controller };
