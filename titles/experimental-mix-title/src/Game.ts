import { Game as BaseGame, defaultConfig } from '@rggt/experimental-mix-game';

export default class Game extends BaseGame {
  constructor(parent: string) {
    super({ ...defaultConfig, parent });
  }
}
