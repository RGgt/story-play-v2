import { TextStyle } from './types';

export function createText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  maxWidth: number,
  style: TextStyle
) {
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
      break;
    case 'MiddleLeft':
      customComponent.setOrigin(0.0, 0.5);
      break;
    case 'TopCenter':
      customComponent.setOrigin(0.5, 0.0);
      break;
    case 'TopRight':
      customComponent.setOrigin(1, 0.0);
      break;

    default:
      throw new Error('Unknown coordinates system!');
  }
  return customComponent;
}
