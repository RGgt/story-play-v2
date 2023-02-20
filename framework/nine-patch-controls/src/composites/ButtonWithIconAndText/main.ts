import { createIconTextButtonText, TextOptions } from '@rggt/basic-controls';
import { Button } from '../../components/Button/control';
import { createButton } from '../../components/Button/main';
import { ButtonOptions } from '../../components/Button/types';

function createButtonWithIconAndText(
  scene: Phaser.Scene,
  options: ButtonOptions,
  contentOptions: { text: string; iconTexture: string }
): {
  button: Button;
  text: Phaser.GameObjects.Text;
  icon: Phaser.GameObjects.Image;
  destroy: () => void;
} {
  const { button } = createButton(scene, options);

  const textConfig: TextOptions = {
    x: button.getLeft() + button.getBound().height,
    y: button.getCenter().y,
    text: contentOptions.text,
    maxWidth: button.getBound().width - button.getBound().height,
  };
  const text = createIconTextButtonText(scene, textConfig);
  scene.add.existing(text.text);

  const image = scene.add.image(
    button.getLeft() + button.getBound().height / 2,
    button.getTop() + button.getBound().height / 2,
    contentOptions.iconTexture
  );
  image.setOrigin(0.5, 0.5);

  let fill: Phaser.GameObjects.Graphics | undefined;
  if (import.meta.env.VITE_DRAW_DEBUG_RECTANGLE.toUpperCase() === 'YES') {
    fill = scene.add.graphics();
    fill.fillStyle(0x00ff00, 0.31);
    fill.fillRect(
      button.getLeft(),
      button.getTop(),
      button.getBound().height,
      button.getBound().height
    );
  }
  return {
    button,
    text: text.text,
    icon: image,
    destroy: () => {
      text.destroy();
      button.destroy();
      image.destroy();
      fill?.destroy();
    },
  };
}

export { createButtonWithIconAndText };
