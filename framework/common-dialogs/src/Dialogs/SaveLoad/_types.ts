interface SaveSlotOptions {
  isEmptySlot: boolean;
  textureName?: string;
  labelText?: string;
}
interface DataModel {
  titleSave: string;
  titleLoad: string;
  titleDelete: string;
  buttonTextClose: string;
  viewMode: 'save' | 'load' | 'delete';
  pageIndex: number;
  saveSlots: SaveSlotOptions[];
  onButtonClickClose: () => void;
  onButtonClickActivateSave: () => void;
  onButtonClickActivateLoad: () => void;
  onButtonClickActivateDelete: () => void;
  onPageChanged: (pageIndex: number) => void;
  onSaveToSlot: (pageIndex: number, slotIndex: number) => void;
  onDeleteFromSlot: (pageIndex: number, slotIndex: number) => void;
  onLoadFromSlot: (pageIndex: number, slotIndex: number) => void;
}

export type { DataModel, SaveSlotOptions };
