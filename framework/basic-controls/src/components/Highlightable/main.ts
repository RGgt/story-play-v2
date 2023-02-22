import { Highlightable } from './control';
import { HighlightableOptions } from './types';

export function createHighlightable(
  scene: Phaser.Scene,
  options: HighlightableOptions
) {
  const customComponent = new Highlightable(scene, options);
  scene.add.existing(customComponent);
  return customComponent;
}
