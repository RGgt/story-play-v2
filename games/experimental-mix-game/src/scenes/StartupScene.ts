import { GameConfiguration, GameConfigurationKeys } from '@rggt/game-base';
import Phaser from 'phaser';
// import CriticalErrorScene from './CriticalErrorScene';
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
    this.load.image(
      'cursor_disabled',
      `${assetsFolder}/images/gui/cursor_disabled.png`
    );
    // this.load.svg('test', `${assetsFolder}/images/vite.svg`);
    // this.load.audio('music', `${assetsFolder}/audio/music.wav`);
  }

  create() {
    this.scene.start(EScenes.InitialLoader);
    this.scene.start(EScenes.Cursor);
    this.scene.start(EScenes.CriticalError);
    // const scene = this.game.scene.getScene(EScenes.CriticalError);
    // const errorScene = scene as unknown as CriticalErrorScene;
    // errorScene.setErrorMessage(
    //   'Failed to load image from file: \r\ngame-assets/experimental-mix-title/images/frame_0991.jpg'
    // );
  }
}
