export type ButtonOptions = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  disabled?: boolean;
  reactionToClick?: (x: number, y: number) => void;
};

export type SimpleButtonOptions = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  text?: string;
  disabled?: boolean;
  reactionToClick?: (x: number, y: number) => void;
};
