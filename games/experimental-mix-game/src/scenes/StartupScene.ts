import { loadAssetFromCommonNode as loadAsset } from '@rggt/phaser-asset-loader';
import { GameConfiguration, GameConfigurationKeys } from '@rggt/game-base';
import Phaser from 'phaser';
import EScenes from './EScenes';
import { reactOnError } from '../logic/reactOnError';

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
        `${assetsFolder}/images/gui/cursor_disabled.png`
      );
      await loadAsset(this, 'image', 'logo', `${assetsFolder}/images/logo.png`);
      await loadAsset(
        this,
        'json',
        'assets',
        `${assetsFolder}/json/assetsList.json`
      );
    } catch (err: unknown) {
      this.scene.start(EScenes.Cursor);
      reactOnError(this.game, err as Error);
      return;
    }
    this.scene.start(EScenes.Cursor);
    this.scene.start(EScenes.InitialLoader);
  }
}
