import Phaser from 'phaser';
import { SPScenes } from '../types/enums';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super(SPScenes.Boot);
  }

  preload() {
    this.load.json('assets', 'assets/json/assetsList.json');
    this.load.image('logo', 'assets/images/logo.png');
  }

  create() {
    this.scene.start(SPScenes.Loader);
  }
}
