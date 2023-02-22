import {
  createColored,
  createHighlightable,
  createTitleText,
} from '@rggt/basic-controls';
import { SaveAndLoadStyles } from '@rggt/game-base';

import { createGroupBox } from '@rggt/nine-patch-controls';
import { PaginationSlotOptions } from './types';

interface InnerStructure {
  slotBox: { destroy: () => void };
  slotText: { destroy: () => void };
  slotHighlightable?: { destroy: () => void };
  slotColoredBox: { destroy: () => void };
}

class PaginationSlot {
  private innerStructure: InnerStructure;

  constructor(scene: Phaser.Scene, options: PaginationSlotOptions) {
    this.innerStructure = this.createFilledGameSlot(scene, options);
  }

  createFilledGameSlot(
    scene: Phaser.Scene,
    options: PaginationSlotOptions
  ): InnerStructure {
    const slotWidth = PaginationSlot.getGameSlotWidth();
    const slotHeight = PaginationSlot.getGameSlotHeight();
    const slotLeft = PaginationSlot.getSlotLeft(
      options.pageIndex,
      options.slotsAreaX,
      options.availableWidth
    );
    const slotTop = options.slotsAreaY + PaginationSlot.getSlotTop();

    const slotColoredBox = createColored(scene, {
      width: slotWidth,
      height: slotHeight,
      x: slotLeft,
      y: slotTop,
      fillColor: options.isActivePage ? 0xffbf00 : 0xad975b,
    });
    const slotBox = createGroupBox(scene, {
      width: slotWidth,
      height: slotHeight,
      x: slotLeft,
      y: slotTop,
    });

    const slotText = createTitleText(scene, {
      x: slotLeft + slotWidth / 2,
      y: slotTop + slotHeight / 2,
      text: options.pageIndex === 0 ? 'A' : `${options.pageIndex}`,
      maxWidth: slotWidth,
    });

    const slotHighlightable = createHighlightable(scene, {
      width: slotWidth,
      height: slotHeight,
      x: slotLeft,
      y: slotTop,
      reactionToClick: options.isActivePage
        ? undefined
        : () => {
            const index = options.pageIndex;
            if (options.onClick) options.onClick(index);
          },
    });

    return { slotColoredBox, slotBox, slotText, slotHighlightable };
  }

  static getSlotLeft(
    slotIndex: number,
    slotsAreaX: number,
    slotsAreaWidth: number
  ) {
    // there are N slots and the middle one is in the center
    const indexOfCentralSlot =
      (SaveAndLoadStyles.paginationSlots -
        (SaveAndLoadStyles.paginationSlots % 2)) /
      2;
    const leftOfCentralSlot =
      slotsAreaX +
      slotsAreaWidth / 2 -
      SaveAndLoadStyles.paginationSlotWidth / 2;
    return (
      leftOfCentralSlot +
      (SaveAndLoadStyles.paginationSlotWidth +
        SaveAndLoadStyles.paginationSlotsSpacing) *
        (slotIndex - indexOfCentralSlot)
    );
  }

  static getSlotTop() {
    return 0;
  }

  static getGameSlotWidth() {
    return SaveAndLoadStyles.paginationSlotWidth;
  }

  static getGameSlotHeight() {
    return SaveAndLoadStyles.paginationSlotHeight;
  }

  destroy() {
    this.innerStructure.slotColoredBox.destroy();
    this.innerStructure.slotBox.destroy();
    this.innerStructure.slotText.destroy();
    this.innerStructure.slotHighlightable?.destroy();
  }
}
export { PaginationSlot };
