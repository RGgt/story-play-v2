import { NinePatch, NinePatchData } from '@rggt/nine-patch';
import { GroupBoxOptions } from './types';

type GroupBoxConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const defaultOptions: GroupBoxConfig = {
  x: 0,
  y: 0,
  width: 400,
  height: 300,
};
class GroupBox extends NinePatch {
  constructor(scene: Phaser.Scene, options: GroupBoxOptions) {
    const data = new NinePatchData('group_box', undefined, 310, 60, 8, 8);
    super(data, scene);
    const x = options.x ?? defaultOptions.x;
    const y = options.y ?? defaultOptions.y;
    const width = options.width ?? defaultOptions.width;
    const height = options.height ?? defaultOptions.height;
    this.init(x, y, width, height);
  }
}
export { GroupBox };
