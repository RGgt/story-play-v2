export type HighlightableOptions = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fillAlphaInactive?: number;
  fillColorInactive?: number;
  fillAlphaHovered?: number;
  fillColorHovered?: number;
  fillAlphaActive?: number;
  fillColorActive?: number;
  reactionToClick?: (x: number, y: number) => void;
};
