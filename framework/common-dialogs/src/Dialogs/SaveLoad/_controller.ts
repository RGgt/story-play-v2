import {
  GameConfiguration,
  GameConfigurationKeys,
  miniatureBase64DataURLToTexture,
  SaveAndLoadStyles,
  SaveGameManager,
} from '@rggt/game-base';
import { View } from './_view';
import { SaveLoadParameters } from './types';
import { IWindowController } from '../_IWindowController';
import { DataModel, SaveSlotOptions } from './_types';

class Controller implements IWindowController {
  public view?: View;

  public async createDialogWindow(
    scene: Phaser.Scene,
    p: unknown,
    onDestroy: () => void
  ) {
    const parameters = p as SaveLoadParameters;
    const activePageIndex = Controller._getActivePage();
    const slotsData = await Controller._getSlotsData(
      parameters.game,
      parameters.serviceSaveLoad,
      activePageIndex
    );

    const callbackClose = parameters.callbackClose ?? (() => {});
    const dataModel: DataModel = {
      buttonTextClose: parameters.buttonTextClose ?? 'Close',
      title: parameters.title ?? 'Save/Load!',
      pageIndex: 0,
      saveSlots: slotsData,
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

  private static _getActivePage() {
    const activeSaveLoadPage = GameConfiguration.get(
      GameConfigurationKeys.ActiveSaveLoadPage
    );
    if (!activeSaveLoadPage) return 0;
    return Number(activeSaveLoadPage);
  }

  private static async _getSlotsData(
    game: Phaser.Game,
    manager: SaveGameManager,
    pageIndex: number
  ) {
    const slotsCount =
      SaveAndLoadStyles.saveSlots.columns * SaveAndLoadStyles.saveSlots.rows;
    const dataPromises: Promise<unknown>[] = [];
    const slots: SaveSlotOptions[] = [];
    const texturePromises: Promise<unknown>[] = [];
    for (let i = 0; i < slotsCount; i += 1) {
      dataPromises.push(
        manager.loadGameHeader(pageIndex * slotsCount + i).then((data) => {
          if (!data) {
            slots.push({ isEmptySlot: true });
            return;
          }
          const slot: SaveSlotOptions = { isEmptySlot: false };
          slot.labelText = (data as { label: string }).label;
          const { b64Texture } = data as { b64Texture: string };
          const textureName = `sys_reserved__save_thumb__${i}`;
          texturePromises.push(
            miniatureBase64DataURLToTexture(game, b64Texture, textureName)
          );
          slot.textureName = textureName;
          slots.push(slot);
        })
      );
    }
    await Promise.all(dataPromises);
    await Promise.all(texturePromises);
    return slots;
  }

  public destroy() {
    if (this.view) {
      this.view.destroy();
    }
  }
}

export { Controller };
