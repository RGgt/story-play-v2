import { SPAwareControl } from '@rggt/game-base';
import { Jumper } from './control';
import { JumperOptions } from './types';

export function createJumper(scene: Phaser.Scene, options: JumperOptions) {
  const customComponent = new Jumper(scene, options);
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
