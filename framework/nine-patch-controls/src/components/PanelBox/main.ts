import { PanelBox } from './control';
import { PanelBoxOptions } from './types';

function createPanelBox(scene: Phaser.Scene, options: PanelBoxOptions) {
  const customComponent = new PanelBox(scene, options);
  scene.add.existing(customComponent);
  return customComponent;
}
export { createPanelBox };
