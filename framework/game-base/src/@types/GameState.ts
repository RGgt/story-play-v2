interface GameState {
  setStateObject: (o: object) => void;
  getStateObject: () => object;
}

export type { GameState };
