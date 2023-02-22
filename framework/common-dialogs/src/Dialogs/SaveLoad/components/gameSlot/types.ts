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
