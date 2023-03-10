import { GameInputPointer, SPAwareControl } from '@rggt/game-base';
import Phaser from 'phaser';

export default class SPScene extends Phaser.Scene {
  protected _inputProcessingSPList: SPAwareControl[] = [];

  override update(time: number, delta: number): void {
    this.processSPInput();
    super.update(time, delta);
  }

  public addToSPInputProcessingList(control: SPAwareControl): void {
    if (this._inputProcessingSPList.indexOf(control) === -1) {
      this._inputProcessingSPList.unshift(control);
      control.onDestroy = () => {
        this.removeFromSPInputProcessingList(control);
      };
    }
  }

  public removeFromSPInputProcessingList(control: SPAwareControl): void {
    const index = this._inputProcessingSPList.indexOf(control);
    if (index !== -1) {
      this._inputProcessingSPList.splice(index, 1);
      control.onDestroy = () => {
        this.removeFromSPInputProcessingList(control);
      };
    }
  }

  protected processSPInput() {
    if (GameInputPointer.alreadyHandled) return;
    this._inputProcessingSPList.forEach((control) => {
      control.processSPInput();
    });
  }
}
