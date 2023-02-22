import { BackgroundBlocker } from './control';
import { BackgroundBlockerStyle } from './types';

export function createBackgroundBlocker(
  scene: Phaser.Scene,
  style: BackgroundBlockerStyle
) {
  const customComponent = new BackgroundBlocker(scene, style);
  scene.add.existing(customComponent);
  return customComponent;
}
