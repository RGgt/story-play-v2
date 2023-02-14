import { NinePatch, NinePatchData } from '@rggt/nine-patch';
import { PanelBoxOptions } from './types';

type PanelBoxConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const defaultOptions: PanelBoxConfig = {
  x: 0,
  y: 0,
  width: 400,
  height: 300,
};
class PanelBox extends NinePatch {
  constructor(scene: Phaser.Scene, options: PanelBoxOptions) {
    const data = new NinePatchData('panel', undefined, 310, 60, 8, 8);
    super(data, scene);
    const x = options.x ?? defaultOptions.x;
    const y = options.y ?? defaultOptions.y;
    const width = options.width ?? defaultOptions.width;
    const height = options.height ?? defaultOptions.height;
    this.init(x, y, width, height);
  }
}
export { PanelBox };
