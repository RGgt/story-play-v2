interface MessageBoxParameters {
  title?: string;
  message: string;
  buttonTextYes?: string;
  buttonTextNo?: string;
  width?: number;
  callbackYes: () => void;
  callbackNo: () => void;
}
export type { MessageBoxParameters };
