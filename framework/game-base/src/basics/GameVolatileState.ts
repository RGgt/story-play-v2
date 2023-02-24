enum GameVolatileStateKeys {
  ActiveSaveLoadPage,
  MostRecentBase64Screenshot,
}

type GameVolatileStateValue = undefined | string;

class GameVolatileStateSingleton {
  private static _instance: GameVolatileStateSingleton;

  private _values = new Map<GameVolatileStateKeys, GameVolatileStateValue>();

  private constructor() {
    // Intentionally left empty, but present to ensure it is private
  }

  public static get Instance() {
    if (!GameVolatileStateSingleton._instance) {
      GameVolatileStateSingleton._instance = new GameVolatileStateSingleton();
    }
    return GameVolatileStateSingleton._instance;
  }

  public get(key: GameVolatileStateKeys): GameVolatileStateValue {
    return this._values.get(key);
  }

  public set(key: GameVolatileStateKeys, value: GameVolatileStateValue): void {
    this._values.set(key, value);
  }
}

export const GameVolatileState = GameVolatileStateSingleton.Instance;
export { GameVolatileStateKeys };
export type { GameVolatileStateValue };
