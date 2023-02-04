import { Game as BaseGame, defaultConfig } from '@rggt/experimental-mix-game';
import { GameConfiguration, GameConfigurationKeys } from '@rggt/game-base';

export default class Game extends BaseGame {
  constructor() {
    super({
      ...defaultConfig,
      parent: GameConfiguration.get(
        GameConfigurationKeys.HtmlContainer
      ) as string,
    });
  }
}
