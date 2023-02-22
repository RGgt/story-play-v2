import { ColoredOptions } from './types';

type ColoredConfig = {
  x: number;
  y: number;
  width: number;
  height: number;
  fillAlpha: number;
  fillColor: number;
};

const defaultOptions: ColoredConfig = {
  x: 0,
  y: 0,
  width: 1920,
  height: 1080,
  fillAlpha: 1,
  fillColor: 0xffbf00,
};

class Colored extends Phaser.GameObjects.Rectangle {
  fillColor: number;

  fillAlpha: number;

  protected _bounds: Phaser.Geom.Rectangle;

  constructor(scene: Phaser.Scene, options: ColoredOptions) {
    const x = options.x ?? defaultOptions.x;
    const y = options.y ?? defaultOptions.y;
    const width = options.width ?? defaultOptions.width;
    const height = options.height ?? defaultOptions.height;
    const fillColor = options.fillColor ?? defaultOptions.fillColor;
    const fillAlpha = options.fillAlpha ?? defaultOptions.fillAlpha;

    super(scene, x, y, width, height, fillColor, fillAlpha);
    this._bounds = new Phaser.Geom.Rectangle(x, y, width, height);
    this.fillColor = fillColor;
    this.fillAlpha = fillAlpha;
    this.setOrigin(0, 0);
  }

  public destroy(): void {
    super.destroy(true);
  }
}
export { Colored };
