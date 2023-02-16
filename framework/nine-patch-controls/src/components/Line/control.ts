import { SinglePatch, SinglePatchData } from '@rggt/nine-patch';
import { LineOptions } from './types';

type LineConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const defaultOptions: LineConfig = {
  x: 0,
  y: 0,
  width: 400,
  height: 300,
};
class Line extends SinglePatch {
  constructor(scene: Phaser.Scene, options: LineOptions) {
    const data = new SinglePatchData('line', undefined, 310, 60); // TODO: correct!
    super(data, scene);
    const x = options.x ?? defaultOptions.x;
    const y = options.y ?? defaultOptions.y;
    const width = options.width ?? defaultOptions.width;
    const height = options.height ?? defaultOptions.height;
    this.init(x, y, width, height);
  }
}
export { Line };
