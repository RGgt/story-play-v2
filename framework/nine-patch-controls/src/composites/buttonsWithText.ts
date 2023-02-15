import {
  createButtonSubText,
  createButtonText,
  createIconTextButtonText,
  TextOptions,
} from '@rggt/basic-controls';
import { Button } from '../components/Button/control';
import { createButton } from '../components/Button/main';
import { ButtonOptions } from '../components/Button/types';

function createButtonWithSimpleText(
  scene: Phaser.Scene,
  options: ButtonOptions,
  contentOptions: { text: string }
): { button: Button; text: Phaser.GameObjects.Text } {
  const { button } = createButton(scene, options);
  const textConfig: TextOptions = {
    x: button.getCenter().x,
    y: button.getCenter().y,
    text: contentOptions.text,
    maxWidth: button.getBound().width,
  };
  const { text } = createButtonText(scene, textConfig);
  return { button, text };
}

function createButtonWithTextAndSubText(
  scene: Phaser.Scene,
  options: ButtonOptions,
  contentOptions: { text: string; subtext: string; subtextColor?: string }
): {
  button: Button;
  text: Phaser.GameObjects.Text;
  subtext: Phaser.GameObjects.Text;
} {
  const { button } = createButton(scene, options);
  const textY =
    button.getTop() + (button.getCenter().y - button.getTop()) * 0.8;
  const subtextY =
    button.getBottom() - (button.getCenter().y - button.getTop()) * 0.6;
  const textConfig: TextOptions = {
    x: button.getCenter().x,
    y: textY,
    text: contentOptions.text,
    maxWidth: button.getBound().width,
  };
  const { text } = createButtonText(scene, textConfig);
  const subtextConfig: TextOptions = {
    x: button.getCenter().x,
    y: subtextY,
    text: contentOptions.subtext,
    colorOverwrite: contentOptions.subtextColor,
    maxWidth: button.getBound().width,
  };
  const { text: subtext } = createButtonSubText(scene, subtextConfig);

  return { button, text, subtext };
}

function createButtonWithIconAndText(
  scene: Phaser.Scene,
  options: ButtonOptions,
  contentOptions: { text: string; iconTexture: string }
): {
  button: Button;
  text: Phaser.GameObjects.Text;
  icon: Phaser.GameObjects.Image;
} {
  const { button } = createButton(scene, options);

  const textConfig: TextOptions = {
    x: button.getLeft() + button.getBound().height,
    y: button.getCenter().y,
    text: contentOptions.text,
    maxWidth: button.getBound().width - button.getBound().height,
  };
  const customComponent = createIconTextButtonText(scene, textConfig);
  scene.add.existing(customComponent.text);

  const image = scene.add.image(
    button.getLeft() + button.getBound().height / 2,
    button.getTop() + button.getBound().height / 2,
    contentOptions.iconTexture
  );
  image.setOrigin(0.5, 0.5);

  if (import.meta.env.VITE_DRAW_DEBUG_RECTANGLE.toUpperCase() === 'YES') {
    const fill = scene.add.graphics();
    fill.fillStyle(0x00ff00, 0.31);
    fill.fillRect(
      button.getLeft(),
      button.getTop(),
      button.getBound().height,
      button.getBound().height
    );
  }
  return { button, text: customComponent.text, icon: image };
}

export {
  createButtonWithSimpleText,
  createButtonWithIconAndText,
  createButtonWithTextAndSubText,
};
