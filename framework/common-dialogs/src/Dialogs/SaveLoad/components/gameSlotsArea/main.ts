import { CommonWindowStyles, SaveAndLoadStyles } from '@rggt/game-base';
import { getGameSlotHeight, getGameSlotWidth } from '../gameSlot/main';

export function getPageSlotsAreaWidth() {
  const width =
    getGameSlotWidth() * SaveAndLoadStyles.saveSlots.columns +
    CommonWindowStyles.spacing * (SaveAndLoadStyles.saveSlots.columns + 1);
  return width;
}
export function getPageSlotsAreaHeight() {
  const width =
    getGameSlotHeight() * SaveAndLoadStyles.saveSlots.rows +
    CommonWindowStyles.spacing * (SaveAndLoadStyles.saveSlots.rows - 1);
  return width;
}
