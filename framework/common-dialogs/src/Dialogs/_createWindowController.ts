import { IWindowController } from './_IWindowController';
import { Controller as MessageBoxController } from './MessageBox/_controller';
import { Controller as MessageBoxYesNoController } from './MessageBoxYesNo/_controller';
import { Controller as SaveLoadController } from './SaveLoad/_controller';
import { Controller as MainMenuController } from './MainMenu/_controller';

function createWindowController(windowTypeCode: string) {
  let controller: IWindowController;
  switch (windowTypeCode) {
    case 'MessageBox':
      controller = new MessageBoxController();
      break;
    case 'MessageBoxYesNo':
      controller = new MessageBoxYesNoController();
      break;
    case 'SaveLoad':
      controller = new SaveLoadController();
      break;
    case 'MainMenu':
      controller = new MainMenuController();
      break;

    default:
      throw new Error('Unknown dialog type!');
  }
  return controller;
}
export { createWindowController };
