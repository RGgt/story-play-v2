interface PaginationSlotOptions {
  slotsAreaY: number;
  slotsAreaX: number;
  pageIndex: number;
  isActivePage: boolean;
  availableWidth: number;
  onClick?: (pageIndex: number) => void;
}

export type { PaginationSlotOptions };
