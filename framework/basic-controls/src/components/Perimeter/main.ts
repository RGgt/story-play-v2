import { SPAwareControl } from '@rggt/game-base';
import { Perimeter } from './control';
import { PerimeterOptions } from './types';

export function createPerimeter(
  scene: Phaser.Scene,
  options: PerimeterOptions
) {
  const customComponent = new Perimeter(scene, options);
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
