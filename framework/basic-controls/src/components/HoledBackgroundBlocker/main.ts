import { BackgroundBlocker } from './control';
import { HoledBackgroundBlockerStyle } from './types';

export function createHoledBackgroundBlocker(
  scene: Phaser.Scene,
  style: HoledBackgroundBlockerStyle
) {
  const customComponent = new BackgroundBlocker(scene, style);
  scene.add.existing(customComponent);
  return customComponent;
}
