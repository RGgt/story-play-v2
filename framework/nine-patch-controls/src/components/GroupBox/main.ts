import { GroupBox } from './control';
import { GroupBoxOptions } from './types';

function createGroupBox(scene: Phaser.Scene, options: GroupBoxOptions) {
  const customComponent = new GroupBox(scene, options);
  scene.add.existing(customComponent);
  return customComponent;
}

export { createGroupBox };
