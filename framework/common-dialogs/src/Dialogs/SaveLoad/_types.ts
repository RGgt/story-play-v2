interface PageSlotData {
  title: string;
  buttonTextClose: string;
  pageIndex: number;
  pageSlots: [];
}
interface DataModel {
  title: string;
  buttonTextClose: string;
  pageIndex: number;
  pageSlots: [];
}

interface BehaviorModel {
  onButtonClickClose: () => void;
  onPageChanged: (pageIndex: number) => void;
  onSaveToSlot: (pageIndex: number, slotIndex: number) => void;
  onLoadFromSlot: (pageIndex: number, slotIndex: number) => void;
}
export type { DataModel, BehaviorModel };
