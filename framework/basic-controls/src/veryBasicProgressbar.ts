import Phaser from 'phaser';

interface VeryBasicProgressbarOptions {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  borderColor?: number;
  borderSize?: number;
  borderAlpha?: number;
  fillColor?: number;
  fillAlpha?: number;
  backColor?: number;
  backAlpha?: number;
}

// An internal type used to ensure the parameters are not undefined.
interface VeryBasicProgressbarConfig {
  left: number;
  top: number;
  width: number;
  height: number;
  borderColor: number;
  borderSize: number;
  borderAlpha: number;
  fillColor: number;
  fillAlpha: number;
  backColor: number;
  backAlpha: number;
}

const defaultOptions: VeryBasicProgressbarOptions = {
  left: 0,
  top: 0,
  width: 400,
  height: 50,
  borderColor: 0xff0000,
  borderSize: 4,
  borderAlpha: 1,
  fillColor: 0xff5500,
  fillAlpha: 1,
  backColor: 0xffffff,
  backAlpha: 1,
};

interface VeryBasicProgressbar {
  update: (value: number, max: number) => void;
  destroy: () => void;
}
const createVeryBasicProgressbar = (
  scene: Phaser.Scene,
  options: VeryBasicProgressbarOptions = defaultOptions
) => {
  const config = {
    ...defaultOptions,
    ...options,
  } as VeryBasicProgressbarConfig;
  const borderRect = new Phaser.Geom.Rectangle(
    config.left,
    config.top,
    config.width,
    config.height
  );
  const back = scene.add.graphics({
    fillStyle: { color: config.backColor, alpha: config.backAlpha },
  });

  back.fillRectShape(borderRect);
  const border = scene.add.graphics({
    lineStyle: {
      width: config.borderSize,
      color: config.borderColor,
      alpha: config.borderAlpha,
    },
  });
  border.strokeRectShape(borderRect);
  const fill = scene.add.graphics();

  const update = (value: number, max: number) => {
    const percentage = value / max;
    fill.clear();
    fill.fillStyle(config.fillColor, config.fillAlpha);
    fill.fillRect(
      config.left + config.borderSize / 2,
      config.top + config.borderSize / 2,
      percentage * (config.width - config.borderSize),
      config.height - config.borderSize
    );
  };
  const destroy = () => {
    fill.destroy();
    back.destroy();
    border.destroy();
  };
  return { update, destroy };
};

export type { VeryBasicProgressbarOptions, VeryBasicProgressbar };
export { createVeryBasicProgressbar };
