import { GameReactions } from '../@types/GameReactions';
import { GameState } from '../@types/GameState';
import { TranslationData } from '../@types/TranslationData';

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

  private _stableData: object = {};

  public stableDataAccessor: {
    setStableData: (o: object) => void;
    getStableData: () => object;
  } = {
    setStableData: (o: object) => {
      this._stableData = o;
    },
    getStableData: () => {
      return this._stableData;
    },
  };

  public translationData: TranslationData = {};

  public uITranslationData: TranslationData = {};

  public getTranslation(data: string) {
    try {
      if (!this.translationData) throw new Error('No translation data!');
      const pathParts = data.split('.');
      const newKey = pathParts[0];
      const newChildren = pathParts.slice(1);
      return this._getTranslationValue(
        this.translationData,
        newKey,
        newChildren
      );
    } catch (err: unknown) {
      this.gameReactions.reactToError(
        new Error(`Invalid translation code '${data}'`)
      );
      return '';
    }
  }

  public getUITranslation(data: string) {
    try {
      if (!this.uITranslationData) throw new Error('No UI translation data!');
      const pathParts = data.split('.');
      const newKey = pathParts[0];
      const newChildren = pathParts.slice(1);
      return this._getTranslationValue(
        this.uITranslationData,
        newKey,
        newChildren
      );
    } catch (err: unknown) {
      this.gameReactions.reactToError(
        new Error(`Invalid UI translation code '${data}'`)
      );
      return '';
    }
  }

  private _getTranslationValue(
    selectedNode: TranslationData,
    key: string,
    children: string[]
  ): string {
    if (children.length === 0) {
      if (selectedNode[key]) return selectedNode[key] as string;
      throw new Error(`Value not found for key '${key}'`);
    }
    const newKey = children[0];
    const newChildren = children.slice(1);
    return this._getTranslationValue(
      selectedNode[key] as TranslationData,
      newKey,
      newChildren
    ) as string;
  }
}

export const GameConfiguration = GameConfigurationSingleton.Instance;
export { GameConfigurationKeys };
export type { GameConfigurationValue };
