import { SPAwareControl } from '@rggt/game-base';
import { HoledBackgroundBlocker } from './control';
import { HoledBackgroundBlockerStyle } from './types';

export function createHoledBackgroundBlocker(
  scene: Phaser.Scene,
  style: HoledBackgroundBlockerStyle
) {
  const customComponent = new HoledBackgroundBlocker(scene, style);
  scene.add.existing(customComponent);
  if ('addToSPInputProcessingList' in scene) {
    (
      scene as unknown as {
        addToSPInputProcessingList: (customComponent: SPAwareControl) => void;
      }
    ).addToSPInputProcessingList(customComponent);
  }
  return customComponent;
}
