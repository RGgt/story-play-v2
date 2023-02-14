export type TextOptions = {
  x?: number;
  y?: number;
  text?: string | string[];
  maxWidth?: number;
};

export type TextCoordType =
  | 'TopLeft'
  | 'TopCenter'
  | 'TopRight'
  | 'MiddleCenter'
  | 'MiddleLeft';

export type TextStyle = {
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  textSize?: string;
  textFontFamily?: string;
  textColor?: string;
  textBackgroundColor?: string;
  outlineTickness?: number;
  outlineColor?: string;
  alignment?: string;
  coords?: TextCoordType;
};
