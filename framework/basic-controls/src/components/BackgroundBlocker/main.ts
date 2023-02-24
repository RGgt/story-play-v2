import { SPAwareControl } from '@rggt/game-base';
import { BackgroundBlocker } from './control';
import { BackgroundBlockerStyle } from './types';

export function createBackgroundBlocker(
  scene: Phaser.Scene,
  style: BackgroundBlockerStyle
) {
  const customComponent = new BackgroundBlocker(scene, style);
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
