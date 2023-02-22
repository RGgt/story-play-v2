import { HoledBackgroundBlocker } from './control';
import { HoledBackgroundBlockerStyle } from './types';

export function createHoledBackgroundBlocker(
  scene: Phaser.Scene,
  style: HoledBackgroundBlockerStyle
) {
  const customComponent = new HoledBackgroundBlocker(scene, style);
  scene.add.existing(customComponent);
  return customComponent;
}
