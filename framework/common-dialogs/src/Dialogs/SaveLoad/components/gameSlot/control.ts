import {
  createHighlightable,
  createSaveButtonText,
  createTitleText,
} from '@rggt/basic-controls';
import { SaveAndLoadStyles, CommonWindowStyles } from '@rggt/game-base';

import { createGroupBox } from '@rggt/nine-patch-controls';
import { GameSlotOptions } from './types';

interface InnerStructure {
  slotPreviewImage?: { destroy: () => void };
  slotLabel: { destroy: () => void };
  boxHighlightable?: { destroy: () => void };
  slotBox: { destroy: () => void };
}

class GameSlot {
  private innerStructure: InnerStructure;

  constructor(scene: Phaser.Scene, options: GameSlotOptions) {
    if (options.isEmptySlot) {
      this.innerStructure = this.createEmptyGameSlot(scene, options);
    } else {
      this.innerStructure = this.createFilledGameSlot(scene, options);
    }
  }

  createEmptyGameSlot(
    scene: Phaser.Scene,
    options: GameSlotOptions
  ): InnerStructure {
    const slotWidth = GameSlot.getGameSlotWidth();
    const slotHeight = GameSlot.getGameSlotHeight();
    const slotLeft =
      options.slotsAreaX + GameSlot.getSlotLeft(options.slotIndex);
    const slotTop = options.slotsAreaY + GameSlot.getSlotTop(options.slotIndex);

    const slotLabel = createTitleText(scene, {
      text: options.largeText,
      x: slotLeft + slotWidth / 2,
      y: slotTop + slotHeight / 2,
      maxWidth: slotWidth,
    });
    const boxHighlightable = createHighlightable(scene, {
      width: slotWidth,
      height: slotHeight,
      x: slotLeft,
      y: slotTop,
      reactionToClick: options.onClick,
    });

    const slotBox = createGroupBox(scene, {
      width: slotWidth,
      height: slotHeight,
      x: slotLeft,
      y: slotTop,
    });

    return { slotLabel, slotBox, boxHighlightable };
  }

  createFilledGameSlot(
    scene: Phaser.Scene,
    options: GameSlotOptions
  ): InnerStructure {
    const slotWidth = GameSlot.getGameSlotWidth();
    const slotHeight = GameSlot.getGameSlotHeight();
    const slotLeft =
      options.slotsAreaX + GameSlot.getSlotLeft(options.slotIndex);
    const slotTop = options.slotsAreaY + GameSlot.getSlotTop(options.slotIndex);

    const slotPreviewImage = scene.add.sprite(
      slotLeft,
      slotTop,
      options.textureName
    );
    slotPreviewImage.setOrigin(0, 0);

    const textLeft = slotLeft + slotWidth / 2;
    const textTop =
      slotTop + slotHeight - SaveAndLoadStyles.saveSlots.labelHeight / 2;
    const slotLabel = createSaveButtonText(scene, {
      text: options.labelText,
      x: textLeft,
      y: textTop,
      maxWidth: slotWidth,
    });
    const boxHighlightable = createHighlightable(scene, {
      width: slotWidth,
      height: slotHeight,
      x: slotLeft,
      y: slotTop,
      reactionToClick: () => {
        const index = options.slotIndex;
        if (options.onClick) options.onClick(index);
      },
    });

    const slotBox = createGroupBox(scene, {
      width: slotWidth,
      height: slotHeight,
      x: slotLeft,
      y: slotTop,
    });

    return { slotPreviewImage, slotLabel, boxHighlightable, slotBox };
  }

  static getSlotLeft(slotIndex: number) {
    const index = slotIndex % SaveAndLoadStyles.saveSlots.columns;
    return index * (GameSlot.getGameSlotWidth() + CommonWindowStyles.spacing);
  }

  static getSlotTop(slotIndex: number) {
    const index = slotIndex - (slotIndex % SaveAndLoadStyles.saveSlots.columns);
    return (
      (index * (GameSlot.getGameSlotHeight() + CommonWindowStyles.spacing)) /
      SaveAndLoadStyles.saveSlots.columns
    );
  }

  static getGameSlotWidth() {
    return SaveAndLoadStyles.saveSlots.thumbnailWidth;
  }

  static getGameSlotHeight() {
    return (
      SaveAndLoadStyles.saveSlots.thumbnailHeight +
      SaveAndLoadStyles.saveSlots.labelHeight
    );
  }

  destroy() {
    this.innerStructure.boxHighlightable?.destroy();
    this.innerStructure.slotLabel.destroy();
    this.innerStructure.slotBox.destroy();
    this.innerStructure.slotPreviewImage?.destroy();
  }
}
export { GameSlot };
