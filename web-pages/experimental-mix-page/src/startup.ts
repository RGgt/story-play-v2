import { Game } from '@rggt/experimental-mix-title';
import { GameConfiguration, GameConfigurationKeys } from '@rggt/game-base';

window.addEventListener('load', () => {
  const defaultFolder = 'game-assets/';
  const urlParams = new URLSearchParams(window.location.search);
  const customFolder = urlParams.get('customFolder') || defaultFolder;
  GameConfiguration.set(GameConfigurationKeys.AssetsFolder, customFolder);
  GameConfiguration.set(GameConfigurationKeys.HtmlContainer, 'game-container');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const game = new Game();
});
export {};
