import { CommonWindowStyles, SaveAndLoadStyles } from '@rggt/game-base';
import { getGameSlotHeight, getGameSlotWidth } from '../gameSlot/main';

export function getPageSlotsAreaWidth() {
  const width =
    getGameSlotWidth() * SaveAndLoadStyles.thumbnailsPerLine +
    CommonWindowStyles.spacing * (SaveAndLoadStyles.thumbnailsPerLine + 1);
  return width;
}
export function getPageSlotsAreaHeight() {
  const width =
    getGameSlotHeight() * SaveAndLoadStyles.thumbnailsPerColumn +
    CommonWindowStyles.spacing * (SaveAndLoadStyles.thumbnailsPerColumn - 1);
  return width;
}
