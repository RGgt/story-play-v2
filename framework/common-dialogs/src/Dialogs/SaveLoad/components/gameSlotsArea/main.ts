import { CommonWindowStyles, SaveAndLoadStyles } from '@rggt/game-base';
import { GameSpot } from '../gameSlot/control';
import { getGameSlotHeight, getGameSlotWidth } from '../gameSlot/main';
import { PageSlotsAreaOptions } from './types';

export function createPageSlotsArea(
  scene: Phaser.Scene,
  options: PageSlotsAreaOptions
) {
  const slot0 = new GameSpot(scene, {
    isEmptySlot: false,
    slotIndex: 0,
    textureName: 'screenshot_0_5',
    labelText: 'save game slot #1\r\na line with some details',
    largeText: 'lugu lugu crocodilumeu',

    slotsAreaX: options.x,
    slotsAreaY: options.y,
  });
  const slot1 = new GameSpot(scene, {
    isEmptySlot: false,
    slotIndex: 1,
    textureName: 'screenshot_0_5',
    labelText: 'save game slot #2\r\na line with some details',
    largeText: 'lugu lugu crocodilumeu',

    slotsAreaX: options.x,
    slotsAreaY: options.y,
  });
  const slot2 = new GameSpot(scene, {
    isEmptySlot: false,
    slotIndex: 2,
    textureName: 'screenshot_0_5',
    labelText: 'save game slot #3\r\na line with some details',
    largeText: 'lugu lugu crocodilumeu',

    slotsAreaX: options.x,
    slotsAreaY: options.y,
  });
  const slot3 = new GameSpot(scene, {
    isEmptySlot: false,
    slotIndex: 3,
    textureName: 'screenshot_0_5',
    labelText: 'save game slot #4\r\na line with some details',
    largeText: 'lugu lugu crocodilumeu',

    slotsAreaX: options.x,
    slotsAreaY: options.y,
  });

  // const c0 = createGameSlot(scene, {
  //   slotIndex: 0,
  //   textureName: 'screenshot_0_5',
  //   labelText: 'save game slot #1\r\na line with some details',
  //   slotsAreaX: options.x,
  //   slotsAreaY: options.y,
  // });
  // const c1 = createGameSlot(scene, {
  //   isEmptySlot: false,
  //   textureName: 'screenshot_0_5',
  //   labelText: 'save game slot #2\r\na line with some details',
  //   slotIndex: 1,
  //   slotsAreaX: options.x,
  //   slotsAreaY: options.y,
  // });
  // const c2 = createGameSlot(scene, {
  //   isEmptySlot: true,
  //   textureName: 'screenshot_0_5',
  //   labelText: 'save game slot #3\r\na line with some details',
  //   slotIndex: 2,
  //   slotsAreaX: options.x,
  //   slotsAreaY: options.y,
  // });
  return { gameSlot: slot0 };
}
export function getPageSlotsAreaWidth() {
  const width =
    getGameSlotWidth() * SaveAndLoadStyles.thumbnailsPerLine +
    CommonWindowStyles.spacing * (SaveAndLoadStyles.thumbnailsPerLine + 1);
  return width;
}
export function getPageSlotsAreaHeight() {
  const width =
    getGameSlotHeight() * SaveAndLoadStyles.thumbnailsPerColumn +
    CommonWindowStyles.spacing * (SaveAndLoadStyles.thumbnailsPerColumn + 1);
  return width;
}
