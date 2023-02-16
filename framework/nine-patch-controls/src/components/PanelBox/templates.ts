import { PanelBoxOptions } from './types';
import { createPanelBox } from './main';

function createCentralPanelBox(
  scene: Phaser.Scene,
  options: {
    width: number;
    height: number;
  }
) {
  const screenCenterX =
    scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
  const screenCenterY =
    scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
  const config: PanelBoxOptions = {
    x: screenCenterX - options.width / 2,
    y: screenCenterY - options.height / 2,
    width: options.width,
    height: options.height,
  };
  return createPanelBox(scene, config);
}
export { createCentralPanelBox };
