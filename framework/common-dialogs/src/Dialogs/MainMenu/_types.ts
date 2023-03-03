interface DataModel {
  isGameStarted?: boolean;
  title: string;
  buttonTextResume: string;
  buttonTextNew: string;
  buttonTextSaveLoad: string;
  buttonTextPreferences: string;
  callbackResume: () => void;
  callbackNew: () => void;
  callbackSaveLoad: () => void;
  callbackPreferences: () => void;
}

export type { DataModel };
