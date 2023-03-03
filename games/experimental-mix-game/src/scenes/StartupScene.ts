import { loadAssetFromCommonNode as loadAsset } from '@rggt/phaser-asset-loader';
import { GameConfiguration, GameConfigurationKeys } from '@rggt/game-base';
import Phaser from 'phaser';
import EScenes from './EScenes';

export default class StartupScene extends Phaser.Scene {
  constructor() {
    super(EScenes.Startup);
  }

  async preload() {
    try {
      const assetsFolder = GameConfiguration.get(
        GameConfigurationKeys.AssetsFolder
      );
      await loadAsset(
        this,
        'image',
        'cursor_disabled',
        `${assetsFolder}/gui/cursor_disabled.png`
      );
      await loadAsset(
        this,
        'image',
        'logo',
        `${assetsFolder}/gui/_initial_logo.png`
      );
      await loadAsset(
        this,
        'json',
        'assets',
        `${assetsFolder}/json/assetsList.json`
      );
      this.scene.stop(this);
    } catch (err: unknown) {
      this.scene.start(EScenes.Cursor);
      GameConfiguration.gameReactions.reactToError(err as Error);
      return;
    }
    this.scene.start(EScenes.Cursor);
    this.scene.start(EScenes.KeyboardInput);
    this.scene.start(EScenes.InitialLoader);
  }
}
