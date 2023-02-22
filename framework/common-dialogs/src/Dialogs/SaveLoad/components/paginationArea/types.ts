interface PaginationAreaOptions {
  activePageIndex: number;
  x: number;
  y: number;
  availableWidth: number;
  onPageChanged: (pageIndex: number) => void;
}
export type { PaginationAreaOptions };
