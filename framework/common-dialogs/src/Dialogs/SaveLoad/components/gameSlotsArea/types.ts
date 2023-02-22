import type { SaveSlotOptions } from '../../_types';

interface PageSlotsAreaOptions {
  pageIndex: number;
  x: number;
  y: number;
  slots: SaveSlotOptions[];
  onSlotClicked?: (pageIndex: number, slotIndex: number) => void;
}
export type { PageSlotsAreaOptions };
