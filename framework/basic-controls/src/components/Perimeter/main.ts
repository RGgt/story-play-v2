import { Perimeter } from './control';
import { PerimeterOptions } from './types';

export function createPerimeter(
  scene: Phaser.Scene,
  options: PerimeterOptions
) {
  const customComponent = new Perimeter(scene, options);
  scene.add.existing(customComponent);
  return customComponent;
}
