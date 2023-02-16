interface DataModel {
  width: number;
  title: string;
  message: string;
  buttonText: string;
}

interface BehaviorModel {
  onButtonClick: () => void;
}
export type { DataModel, BehaviorModel };
