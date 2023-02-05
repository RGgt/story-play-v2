import { GameConfiguration, GameConfigurationKeys } from '@rggt/game-base';
import Phaser from 'phaser';
import EScenes from './EScenes';

export default class StartupScene extends Phaser.Scene {
  constructor() {
    super(EScenes.Startup);
  }

  preload() {
    const assetsFolder = GameConfiguration.get(
      GameConfigurationKeys.AssetsFolder
    );
    this.load.json('assets', `${assetsFolder}/json/assetsList.json`);
    this.load.image('logo', `${assetsFolder}/images/logo.png`);
  }

  create() {
    this.scene.start(EScenes.InitialLoader);
  }
}
