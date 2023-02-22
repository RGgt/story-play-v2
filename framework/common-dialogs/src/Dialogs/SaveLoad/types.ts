interface SaveLoadParameters {
  isSaveMode?: boolean;
  title?: string;
  buttonTextClose?: string;
  callbackClose?: () => void;
  serviceSaveLoad?: object;
}
export type { SaveLoadParameters };
