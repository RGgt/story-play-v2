export type JumperOptions = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  reactionToAdvance?: () => void;
  reactionToReturn?: () => void;
  reactionToMenu?: () => void;
};
