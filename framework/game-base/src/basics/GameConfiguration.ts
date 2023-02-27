import { GameReactions } from '../@types/GameReactions';
import { GameState } from '../@types/GameState';

enum GameConfigurationKeys {
  AssetsFolder,
  HtmlContainer,
  ActiveSaveLoadPage,
}

type GameConfigurationValue = undefined | string;

class GameConfigurationSingleton {
  private static _instance: GameConfigurationSingleton;

  private _values = new Map<GameConfigurationKeys, GameConfigurationValue>();

  private constructor() {
    // Intentionally left empty, but present to ensure it is private
  }

  public static get Instance() {
    if (!GameConfigurationSingleton._instance) {
      GameConfigurationSingleton._instance = new GameConfigurationSingleton();
    }
    return GameConfigurationSingleton._instance;
  }

  public get(key: GameConfigurationKeys): GameConfigurationValue {
    return this._values.get(key);
  }

  public set(key: GameConfigurationKeys, value: GameConfigurationValue): void {
    this._values.set(key, value);
  }

  public gameReactions: GameReactions = {
    reactToCursorOption: () => {},
    reactToError: () => {},
    reactToNewDialogRequest: () => {},
  };

  private _state: object = {};

  public stateAccessor: GameState = {
    setStateObject: (o: object) => {
      this._state = o;
    },
    getStateObject: () => {
      return this._state;
    },
  };
}

export const GameConfiguration = GameConfigurationSingleton.Instance;
export { GameConfigurationKeys };
export type { GameConfigurationValue };
