import { Game } from '@rggt/experimental-mix-title';
import { GameConfiguration, GameConfigurationKeys } from '@rggt/game-base';
import { getReadyToStart } from './getReadyToStart';

async function start() {
  await getReadyToStart();

  GameConfiguration.set(
    GameConfigurationKeys.AssetsFolder,
    'game-assets/experimental-mix-title'
  );
  GameConfiguration.set(GameConfigurationKeys.HtmlContainer, 'game-container');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const game = new Game();
}

start();

export {};
