import { createButtonText, TextOptions } from '@rggt/basic-controls';
import { Button } from '../../components/Button/control';
import { createButton } from '../../components/Button/main';
import { ButtonOptions } from '../../components/Button/types';

function createButtonWithSimpleText(
  scene: Phaser.Scene,
  options: ButtonOptions,
  contentOptions: { text: string }
): {
  button: Button;
  text: Phaser.GameObjects.Text;
  destroy: () => void;
} {
  const { button } = createButton(scene, options);
  const textConfig: TextOptions = {
    x: button.getCenter().x,
    y: button.getCenter().y,
    text: contentOptions.text,
    maxWidth: button.getBound().width,
  };
  const text = createButtonText(scene, textConfig);
  return {
    button,
    text: text.text,
    destroy: () => {
      text.destroy();
      button.destroy();
    },
  };
}

export { createButtonWithSimpleText };
