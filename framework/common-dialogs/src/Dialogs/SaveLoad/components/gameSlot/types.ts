interface GameSlotOptions {
  viewMode: 'save' | 'load' | 'delete';
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
