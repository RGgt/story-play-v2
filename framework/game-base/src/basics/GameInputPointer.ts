class GameInputPointerSingleton {
  private static _instance: GameInputPointerSingleton;

  public x = 0;

  public y = 0;

  public button = 0;

  public isDown = false;

  public alreadyHandled = false;

  private constructor() {
    // Intentionally left empty, but present to ensure it is private
  }

  public static get Instance() {
    if (!GameInputPointerSingleton._instance) {
      GameInputPointerSingleton._instance = new GameInputPointerSingleton();
    }
    return GameInputPointerSingleton._instance;
  }
}

export const GameInputPointer = GameInputPointerSingleton.Instance;
