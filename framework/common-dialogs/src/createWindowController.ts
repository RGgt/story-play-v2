import { IWindowController } from './IWindowController';
import { Controller as MessageBoxController } from './Dialogs/MessageBox/controller';

function createWindowController(windowTypeCode: string) {
  let controller: IWindowController;
  switch (windowTypeCode) {
    case 'MessageBox':
      controller = new MessageBoxController();
      break;

    default:
      throw new Error('Unknown dialog type!');
  }
  return controller;
}
export { createWindowController };
