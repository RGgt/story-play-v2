interface PageSlotOptions {
  isEmptySlot: boolean;
  textureName?: string;
  labelText?: string;
}
interface PageSlotsAreaOptions {
  pageIndex: number;
  x: number;
  y: number;
  slots: PageSlotOptions[];
  onSlotClicked?: (pageIndex: number, slotIndex: number) => void;
}
export type { PageSlotsAreaOptions };
