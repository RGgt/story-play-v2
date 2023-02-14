import { PanelBoxOptions } from './types';
import { createPanelBox } from './main';

function createCentralPanelBox(
  scene: Phaser.Scene,
  width: number,
  height: number
) {
  const screenCenterX =
    scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
  const screenCenterY =
    scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
  const options: PanelBoxOptions = {
    x: screenCenterX - width / 2,
    y: screenCenterY - height / 2,
    width,
    height,
  };
  return createPanelBox(scene, options);
}
export { createCentralPanelBox };
