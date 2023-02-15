export type ButtonConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  disabled: boolean;
  reactionToClick: (x: number, y: number) => void;
};

export const defaultOptions: ButtonConfig = {
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
  disabled: false,
  reactionToClick: () => console.log('clicked'),
};
