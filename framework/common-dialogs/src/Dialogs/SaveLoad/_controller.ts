import { View } from './_view';
import { SaveLoadParameters } from './types';
import { IWindowController } from '../_IWindowController';
import { DataModel } from './_types';

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
      pageIndex: 0,
      saveSlots: [
        {
          isEmptySlot: true,
        },
        {
          isEmptySlot: false,
          textureName: 'screenshot_0_5',
          labelText: 'save game slot #1\r\na line with some details',
        },
        {
          isEmptySlot: true,
        },
        {
          isEmptySlot: false,
          textureName: 'screenshot_0_5',
          labelText: 'Friday, October 15 2021\r\n23:42',
        },
        {
          isEmptySlot: true,
        },
        {
          isEmptySlot: true,
        },
      ],
      onButtonClickClose: () => {
        this.destroy();
        onDestroy();
        callbackClose();
      },
      onPageChanged: (pageIndex: number) => {},
      onSaveToSlot: (pageIndex: number, slotIndex: number) => {},
      onLoadFromSlot: (pageIndex: number, slotIndex: number) => {},
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
