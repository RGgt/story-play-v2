interface MessageBoxParameters {
  title?: string;
  message: string;
  buttonText?: string;
  width?: number;
  callback: () => void;
}
export type { MessageBoxParameters };
