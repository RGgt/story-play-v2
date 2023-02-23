import { DialogsManager } from '@rggt/common-dialogs';
import EScenes from './EScenes';

export default class DialogWindowsScene extends Phaser.Scene {
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
