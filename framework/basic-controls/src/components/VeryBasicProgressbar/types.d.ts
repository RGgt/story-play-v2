export interface VeryBasicProgressbar {
  update: (value: number, max: number) => void;
  destroy: () => void;
}

export interface VeryBasicProgressbarOptions {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  borderColor?: number;
  borderSize?: number;
  borderAlpha?: number;
  fillColor?: number;
  fillAlpha?: number;
  backColor?: number;
  backAlpha?: number;
}
