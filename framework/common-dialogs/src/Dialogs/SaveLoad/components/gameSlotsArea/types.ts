import type { SaveSlotOptions } from '../../_types';

interface PageSlotsAreaOptions {
  pageIndex: number;
  x: number;
  y: number;
  slots: SaveSlotOptions[];
  viewMode: 'save' | 'load' | 'delete';
  onSlotClicked?: (pageIndex: number, slotIndex: number) => void;
}
export type { PageSlotsAreaOptions };
