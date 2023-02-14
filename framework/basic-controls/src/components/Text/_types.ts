export type TextConfig = {
  x: number;
  y: number;
  text: string | string[];
  maxWidth: number;
};
export const defaultOptions: TextConfig = {
  x: 0,
  y: 0,
  maxWidth: 1920,
  text: '',
};
