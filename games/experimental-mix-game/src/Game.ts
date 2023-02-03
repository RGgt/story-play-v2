import Phaser from 'phaser';

export default class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    const scenes = Game.getScenes();
    const realConfig = { ...config, scene: scenes };
    super(realConfig);
  }

  private static getScenes = (): Array<Phaser.Scene> => {
    return [];
  };
}
