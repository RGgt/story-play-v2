import { Game } from '@rggt/experimental-mix-title';
import { GameConfiguration, GameConfigurationKeys } from '@rggt/game-base';

window.addEventListener('load', () => {
  GameConfiguration.set(
    GameConfigurationKeys.AssetsFolder,
    'game-assets/experimental-mix-title'
  );
  GameConfiguration.set(GameConfigurationKeys.HtmlContainer, 'game-container');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const game = new Game();
});
export {};
