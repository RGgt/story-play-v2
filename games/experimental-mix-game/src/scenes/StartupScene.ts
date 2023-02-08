import { loadAssetFromCommonNode as loadAsset } from '@rggt/phaser-asset-loader';
import { GameConfiguration, GameConfigurationKeys } from '@rggt/game-base';
import Phaser from 'phaser';
// import CriticalErrorScene from './CriticalErrorScene';
import EScenes from './EScenes';

export default class StartupScene extends Phaser.Scene {
  constructor() {
    super(EScenes.Startup);
  }

  async preload() {
    const assetsFolder = GameConfiguration.get(
      GameConfigurationKeys.AssetsFolder
    );
    await loadAsset(
      this,
      'image',
      'cursor_disabled',
      `${assetsFolder}/images/gui/cursor_disabled.png`
    );
    await loadAsset(this, 'image', 'logo', `${assetsFolder}/images/logo.png`);
    await loadAsset(
      this,
      'json',
      'assets',
      `${assetsFolder}/json/assetsList.json`
    );
    await loadAsset(
      this,
      'image',
      'logoMissing',
      `${assetsFolder}/images/logoMissing.png`
    );

    this.scene.start(EScenes.Cursor);
    this.scene.start(EScenes.InitialLoader);
  }
}
