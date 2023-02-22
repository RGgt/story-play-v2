import { GameSpot } from '../gameSlot/control';
import { PageSlotsAreaOptions } from './types';

interface InnerStructure {
  slot0: { destroy: () => void };
  slot1: { destroy: () => void };
  slot2: { destroy: () => void };
  slot3: { destroy: () => void };
  slot4: { destroy: () => void };
  slot5: { destroy: () => void };
}

class GameSlotsArea {
  private innerStructure: InnerStructure;

  constructor(scene: Phaser.Scene, options: PageSlotsAreaOptions) {
    const onClick = (index: number) => {
      console.log(`clicked on index ${index}`);
    };
    const slot0 = new GameSpot(scene, {
      isEmptySlot: true,
      slotIndex: 0,
      textureName: 'screenshot_0_5',
      labelText: 'save game slot #1\r\na line with some details',
      largeText: 'Empty \r\nslot',
      slotsAreaX: options.x,
      slotsAreaY: options.y,
      onClick,
    });
    const slot1 = new GameSpot(scene, {
      isEmptySlot: true,
      slotIndex: 1,
      textureName: 'screenshot_0_5',
      labelText: 'save game slot #2\r\na line with some details',
      largeText: 'empty \r\nslot',
      slotsAreaX: options.x,
      slotsAreaY: options.y,
      onClick,
    });
    const slot2 = new GameSpot(scene, {
      isEmptySlot: true,
      slotIndex: 2,
      textureName: 'screenshot_0_5',
      labelText: 'save game slot #3\r\na line with some details',
      largeText: 'EMPTY \r\nSLOT',
      slotsAreaX: options.x,
      slotsAreaY: options.y,
      onClick,
    });
    const slot3 = new GameSpot(scene, {
      isEmptySlot: true,
      slotIndex: 3,
      textureName: 'screenshot_0_5',
      labelText: 'save game slot #4\r\na line with some details',
      largeText: 'Empty \r\nSlot',
      slotsAreaX: options.x,
      slotsAreaY: options.y,
      onClick,
    });
    const slot4 = new GameSpot(scene, {
      isEmptySlot: false,
      slotIndex: 4,
      textureName: 'screenshot_0_5',
      labelText: 'save game slot #5\r\na line with some details',
      largeText: 'lugu lugu crocodilumeu',
      slotsAreaX: options.x,
      slotsAreaY: options.y,
      onClick,
    });
    const slot5 = new GameSpot(scene, {
      isEmptySlot: false,
      slotIndex: 5,
      textureName: 'screenshot_0_5',
      labelText: 'save game slot #6\r\na line with some details',
      largeText: 'lugu lugu crocodilumeu',
      slotsAreaX: options.x,
      slotsAreaY: options.y,
      onClick,
    });
    this.innerStructure = { slot0, slot1, slot2, slot3, slot4, slot5 };
  }

  destroy() {
    this.innerStructure.slot0.destroy();
    this.innerStructure.slot1.destroy();
    this.innerStructure.slot2.destroy();
    this.innerStructure.slot3.destroy();
    this.innerStructure.slot4.destroy();
    this.innerStructure.slot5.destroy();
  }
}
export { GameSlotsArea };
