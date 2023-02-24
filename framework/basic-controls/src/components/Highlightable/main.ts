import { SPAwareControl } from '@rggt/game-base';
import { Highlightable } from './control';
import { HighlightableOptions } from './types';

export function createHighlightable(
  scene: Phaser.Scene,
  options: HighlightableOptions
) {
  const customComponent = new Highlightable(scene, options);
  scene.add.existing(customComponent);
  if ('addToSPInputProcessingList' in scene) {
    (
      scene as unknown as {
        addToSPInputProcessingList: (customComponent: SPAwareControl) => void;
      }
    ).addToSPInputProcessingList(customComponent);
  }
  return customComponent;
}
