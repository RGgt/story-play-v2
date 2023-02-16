import Phaser from 'phaser';
import { Controller as MessageBoxController } from './Dialogs/MessageBox/controller';
import { MessageBoxParameters } from './Dialogs/MessageBox/types';

class DialogsManager {
  public constructor(protected scene: Phaser.Scene) {
    // code goes here
  }

  public createDialog(dialogTypeCode: string, windowParameters: unknown) {
    let controller: { createDialog: () => void };
    switch (dialogTypeCode) {
      case 'MessageBox':
        controller = new MessageBoxController(
          this.scene,
          windowParameters as MessageBoxParameters
        );
        break;

      default:
        throw new Error('Unknown dialog type!');
    }
    controller.createDialog();
  }

  public destroy() {
    // code
  }
}
export { DialogsManager };
