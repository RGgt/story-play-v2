interface SaveSlotOptions {
  isEmptySlot: boolean;
  textureName?: string;
  labelText?: string;
}
interface DataModel {
  title: string;
  buttonTextClose: string;
  pageIndex: number;
  saveSlots: SaveSlotOptions[];
  onButtonClickClose: () => void;
  onPageChanged: (pageIndex: number) => void;
  onSaveToSlot: (pageIndex: number, slotIndex: number) => void;
  onLoadFromSlot: (pageIndex: number, slotIndex: number) => void;
}

export type { DataModel, SaveSlotOptions };
