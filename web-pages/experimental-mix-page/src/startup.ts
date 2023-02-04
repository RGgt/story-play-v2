import { Game } from '@rggt/experimental-mix-title';

window.addEventListener('load', () => {
  const defaultFolder = 'game-assets/';
  const urlParams = new URLSearchParams(window.location.search);
  const customFolder = urlParams.get('customFolder') || defaultFolder;
  // TODO: use customFolder

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const game = new Game('game-container');
});
export {};
