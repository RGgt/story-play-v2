interface DataModel {
  width: number;
  title: string;
  message: string;
  buttonTextYes: string;
  buttonTextNo: string;
}

interface BehaviorModel {
  onButtonClickYes: () => void;
  onButtonClickNo: () => void;
}
export type { DataModel, BehaviorModel };
