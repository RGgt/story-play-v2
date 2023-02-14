import { Button } from './control';
import { ButtonOptions } from './types';

function createButton(scene: Phaser.Scene, options: ButtonOptions) {
  const customComponent = new Button(scene, options);
  scene.add.existing(customComponent);
  return { button: customComponent };
}

export { createButton };
