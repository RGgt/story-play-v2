interface MessageBoxParameters {
  title?: string;
  message: string;
  ButtonText?: string;
  width?: number;
  callback: () => void;
}
export type { MessageBoxParameters };
