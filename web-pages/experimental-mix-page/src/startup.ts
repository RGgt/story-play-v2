import { Game } from '@rggt/experimental-mix-title';
import { GameConfiguration, GameConfigurationKeys } from '@rggt/game-base';
import { getReadyToStart } from './getReadyToStart';

async function start() {
  await getReadyToStart();

  GameConfiguration.set(
    GameConfigurationKeys.AssetsFolder,
    'game-assets/experimental-mix-title'
  );
  // TODO: learn to use env variable on GitHub Pages!
  // if (import.meta.env.VITE_USE_CUSTOM_ASSETS_FOLDER.toUpperCase() === 'YES') {
  //   GameConfiguration.set(
  //     GameConfigurationKeys.AssetsFolder,
  //     import.meta.env.VITE_CUSTOM_ASSETS_FOLDER
  //   );
  // }
  GameConfiguration.set(GameConfigurationKeys.HtmlContainer, 'game-container');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const game = new Game();
}

start();

export {};
