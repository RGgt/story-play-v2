import { Line } from './control';
import { LineOptions } from './types';

function createLine(scene: Phaser.Scene, options: LineOptions) {
  const customComponent = new Line(scene, options);
  scene.add.existing(customComponent);
  return customComponent;
}

export { createLine };
