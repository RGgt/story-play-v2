import { SaveAndLoadStyles } from '@rggt/game-base';
import { GameSlot } from '../gameSlot/control';
import { PageSlotsAreaOptions } from './types';

interface InnerStructure {
  [key: string]: { destroy: () => void };
}

class GameSlotsArea {
  private innerStructure: InnerStructure;

  constructor(scene: Phaser.Scene, options: PageSlotsAreaOptions) {
    const onClick = (index: number) => {
      if (options.onSlotClicked)
        options.onSlotClicked(options.pageIndex, index);
    };
    this.innerStructure = {};
    for (
      let i = 0;
      i <
      SaveAndLoadStyles.saveSlots.columns * SaveAndLoadStyles.saveSlots.rows;
      i += 1
    ) {
      this.innerStructure[`slot_${i}`] = GameSlotsArea.createSlot(
        i,
        scene,
        options,
        onClick
      );
    }
  }

  static createSlot(
    index: number,
    scene: Phaser.Scene,
    options: PageSlotsAreaOptions,
    onClick: (index: number) => void
  ) {
    return new GameSlot(scene, {
      isEmptySlot: options.slots[index].isEmptySlot,
      slotIndex: index,
      viewMode: options.viewMode,
      textureName: options.slots[index].textureName ?? '',
      labelText: options.slots[index].labelText ?? '',
      largeText: options.slots[index].isEmptySlot ? options.slotTextEmpty : '',
      slotsAreaX: options.x,
      slotsAreaY: options.y,
      onClick,
    });
  }

  destroy() {
    Object.values(this.innerStructure).forEach((value) => value.destroy());
  }
}
export { GameSlotsArea };
