// import { Highlightable } from '@rggt/basic-controls';
// import { GroupBox } from '@rggt/nine-patch-controls';

// interface GameSlot {
//   hasData: boolean;
//   slotBox: GroupBox;
//   slotLargeText?: Phaser.GameObjects.Text;
//   slotHighlightable: Highlightable;
//   slotPreviewImage?: Phaser.GameObjects.Sprite;
//   slotPreviewLabel?: Phaser.GameObjects.Text;
// }

interface GameSlotOptions {
  slotIndex: number;
  slotsAreaY: number;
  slotsAreaX: number;
  isEmptySlot: boolean;
  textureName: string;
  labelText?: string;
  largeText?: string;
  onClick?: (index: number) => void;
}

export type { GameSlotOptions };
