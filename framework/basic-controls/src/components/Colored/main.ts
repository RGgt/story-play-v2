import { Colored } from './control';
import { ColoredOptions } from './types';

export function createColored(scene: Phaser.Scene, options: ColoredOptions) {
  const customComponent = new Colored(scene, options);
  scene.add.existing(customComponent);
  return customComponent;
}
