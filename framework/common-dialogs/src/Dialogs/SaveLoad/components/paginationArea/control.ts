import { SaveAndLoadStyles } from '@rggt/game-base';
import { PaginationSlot } from '../paginationSlot/control';
import { PaginationAreaOptions } from './types';

interface InnerStructure {
  [key: string]: { destroy: () => void };
}

class PaginationSlotsArea {
  private innerStructure: InnerStructure;

  constructor(scene: Phaser.Scene, options: PaginationAreaOptions) {
    const onClick = (index: number) => {
      console.log(`clicked on page slot: ${index}`);
    };
    this.innerStructure = {};
    for (let i = 0; i < SaveAndLoadStyles.paginationSlots.count; i += 1) {
      this.innerStructure[`slot_${i}`] = PaginationSlotsArea.createSlot(
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
    options: PaginationAreaOptions,
    onClick: (index: number) => void
  ) {
    return new PaginationSlot(scene, {
      pageIndex: index,
      isActivePage: options.activePageIndex === index,
      availableWidth: options.availableWidth,
      slotsAreaX: options.x,
      slotsAreaY: options.y,
      onClick,
    });
  }

  destroy() {
    Object.values(this.innerStructure).forEach((value) => value.destroy());
  }
}
export { PaginationSlotsArea };
