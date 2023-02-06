import Phaser from 'phaser';
import CursorScene from './scenes/CursorScene';
import InitialLoaderScene from './scenes/InitialLoaderScene';
import StartupScene from './scenes/StartupScene';

export default class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    const scenes = Game.getScenes();
    const realConfig = { ...config, scene: scenes };
    super(realConfig);
  }

  private static getScenes = (): Array<Phaser.Scene> => {
    return [new StartupScene(), new InitialLoaderScene(), new CursorScene()];
  };
}
