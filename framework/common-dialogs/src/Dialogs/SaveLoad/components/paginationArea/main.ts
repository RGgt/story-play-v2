import { CommonWindowStyles, SaveAndLoadStyles } from '@rggt/game-base';
import { getGameSlotHeight, getGameSlotWidth } from '../paginationSlot/main';

export function getPaginationAreaWidth() {
  const width =
    getGameSlotWidth() * SaveAndLoadStyles.paginationSlots.count +
    SaveAndLoadStyles.paginationSlots.spacing *
      (SaveAndLoadStyles.paginationSlots.count + 1);
  return width;
}
export function getPaginationAreaHeight() {
  const width = getGameSlotHeight();
  return width;
}
