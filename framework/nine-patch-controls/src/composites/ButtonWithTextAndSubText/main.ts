import {
  createButtonSubText,
  createButtonText,
  TextOptions,
} from '@rggt/basic-controls';
import { DrawDebug } from '@rggt/game-base';
import { Button } from '../../components/Button/control';
import { createButton } from '../../components/Button/main';
import { ButtonOptions } from '../../components/Button/types';

function createButtonWithTextAndSubText(
  scene: Phaser.Scene,
  options: ButtonOptions,
  contentOptions: { text: string; subtext: string; subtextColor?: string }
): {
  button: Button;
  text: Phaser.GameObjects.Text;
  subtext: Phaser.GameObjects.Text;
  destroy: () => void;
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
  const text = createButtonText(scene, textConfig);
  const subtextConfig: TextOptions = {
    x: button.getCenter().x,
    y: subtextY,
    text: contentOptions.subtext,
    colorOverwrite: contentOptions.subtextColor,
    maxWidth: button.getBound().width,
  };
  const subtext = createButtonSubText(scene, subtextConfig);

  let fill1: Phaser.GameObjects.Graphics | undefined;
  let fill2: Phaser.GameObjects.Graphics | undefined;
  if (
    import.meta.env.VITE_DRAW_DEBUG_RECTANGLE_FOR_SLOTS.toUpperCase() === 'YES'
  ) {
    fill1 = scene.add.graphics();
    fill1.fillStyle(DrawDebug.slots.slot1.color, DrawDebug.slots.slot1.alpha);
    fill1.fillRect(
      button.getLeft(),
      button.getTop(),
      button.getBound().width,
      button.getBound().height / 2
    );
    fill2 = scene.add.graphics();
    fill2.fillStyle(DrawDebug.slots.slot2.color, DrawDebug.slots.slot2.alpha);
    fill2.fillRect(
      button.getLeft(),
      button.getTop() + button.getBound().height / 2,
      button.getBound().width,
      button.getBound().height / 2
    );
  }
  return {
    button,
    text: text.text,
    subtext: subtext.text,
    destroy: () => {
      text.destroy();
      button.destroy();
      subtext.destroy();
    },
  };
}

export { createButtonWithTextAndSubText };
