import { DialogsManager } from '@rggt/common-dialogs';
import EScenes from './EScenes';
import SPScene from './SPScene';

export default class DialogWindowsScene extends SPScene {
  private _dialogsManager: DialogsManager;

  constructor() {
    super(EScenes.DialogWindows);
    this._dialogsManager = new DialogsManager(this);
  }

  async doShowDialog(windowTypeCode: string, windowParameters: unknown) {
    await this._dialogsManager.createDialog(windowTypeCode, windowParameters);
  }

  create() {
    this.game.events.on('show-dialog', this.doShowDialog.bind(this), this);
  }
}
