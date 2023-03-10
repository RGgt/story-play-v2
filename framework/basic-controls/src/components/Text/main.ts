// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ImportMeta } from '@rggt/env-types';
import { DrawDebug } from '@rggt/game-base';
import { TextOptions, TextStyle } from './types';
import { defaultOptions } from './_types';

export function createText(
  scene: Phaser.Scene,
  options: TextOptions,
  style: TextStyle
) {
  const x = options.x ?? defaultOptions.x;
  const y = options.y ?? defaultOptions.y;
  const maxWidth = options.maxWidth ?? defaultOptions.maxWidth;
  const text = options.text ?? defaultOptions.text;
  const textDebugHeight = DrawDebug.texts.lineHeight;

  let fill: Phaser.GameObjects.Graphics | undefined;
  try {
    if (
      import.meta.env.VITE_DRAW_DEBUG_RECTANGLE_FOR_TEXTS.toUpperCase() ===
      'YES'
    ) {
      fill = scene.add.graphics();
      fill.fillStyle(DrawDebug.texts.lineColor, DrawDebug.texts.lineAlpha);
      fill.fillRect(x, y, maxWidth, textDebugHeight);
    }
  } catch {
    /* empty */
  }
  const textShadow: Phaser.Types.GameObjects.Text.TextShadow = {
    offsetX: style.shadowOffsetX,
    offsetY: style.shadowOffsetY,
    color: style.shadowColor,
    blur: style.shadowBlur,
    fill: false,
    stroke: true,
  };
  const textWrapping: Phaser.Types.GameObjects.Text.TextWordWrap = {
    width: maxWidth,
    useAdvancedWrap: true,
  };
  const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: style.textSize ?? '32px',
    backgroundColor: style.textBackgroundColor,
    fontFamily: style.textFontFamily ?? 'Courier',
    color: style.textColor ?? 'black',
    strokeThickness: style.outlineTickness ?? 0,
    stroke: style.outlineColor,
    shadow: textShadow,
    wordWrap: textWrapping,
    align: style.alignment,
  };
  const customComponent = new Phaser.GameObjects.Text(
    scene,
    x,
    y,
    text,
    textStyle
  );
  switch (style.coords) {
    case undefined:
    case 'TopLeft':
      customComponent.setOrigin(0.0, 0.0);
      break;
    case 'MiddleCenter':
      customComponent.setOrigin(0.5, 0.5);
      fill?.setPosition(-maxWidth / 2, -textDebugHeight / 2);
      break;
    case 'MiddleLeft':
      customComponent.setOrigin(0.0, 0.5);
      fill?.setPosition(0, -textDebugHeight / 2);
      break;
    case 'TopCenter':
      customComponent.setOrigin(0.5, 0.0);
      fill?.setPosition(-maxWidth / 2, 0);
      break;
    case 'TopRight':
      customComponent.setOrigin(1, 0.0);
      fill?.setPosition(-maxWidth, 0);

      break;

    default:
      throw new Error('Unknown coordinates system!');
  }
  scene.add.existing(customComponent);
  return {
    text: customComponent,
    destroy: () => {
      customComponent.destroy();
      fill?.destroy();
    },
  };
}
