import { IWindowController } from './_IWindowController';
import { Controller as MessageBoxController } from './MessageBox/_controller';
import { Controller as MessageBoxYesNoController } from './MessageBoxYesNo/_controller';

function createWindowController(windowTypeCode: string) {
  let controller: IWindowController;
  switch (windowTypeCode) {
    case 'MessageBox':
      controller = new MessageBoxController();
      break;
    case 'MessageBoxYesNo':
      controller = new MessageBoxYesNoController();
      break;

    default:
      throw new Error('Unknown dialog type!');
  }
  return controller;
}
export { createWindowController };
