import { SPAwareControl } from '@rggt/game-base';
import { Button } from './control';
import { ButtonOptions } from './types';

function createButton(scene: Phaser.Scene, options: ButtonOptions) {
  const customComponent = new Button(scene, options);
  scene.add.existing(customComponent);
  if ('addToSPInputProcessingList' in scene) {
    (
      scene as unknown as {
        addToSPInputProcessingList: (customComponent: SPAwareControl) => void;
      }
    ).addToSPInputProcessingList(customComponent);
  }
  return { button: customComponent };
}

export { createButton };
