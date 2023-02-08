import Phaser from 'phaser';
import CriticalErrorScene from './scenes/CriticalErrorScene';
import CursorScene from './scenes/CursorScene';
import DialogWindowsScene from './scenes/DialogWindowsScene';
import InitialLoaderScene from './scenes/InitialLoaderScene';
import StartupScene from './scenes/StartupScene';

export default class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    const scenes = Game.getScenes();
    const realConfig = { ...config, scene: scenes };
    super(realConfig);
  }

  private static getScenes = (): Array<Phaser.Scene> => {
    return [
      new StartupScene(),
      new InitialLoaderScene(),
      new CriticalErrorScene(),
      new CursorScene(),
      new DialogWindowsScene(),
    ];
  };
}
