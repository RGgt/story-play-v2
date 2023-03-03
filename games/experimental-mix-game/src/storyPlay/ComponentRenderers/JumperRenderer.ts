import { createJumper, Jumper } from '@rggt/basic-controls';

interface JumperRendererConfig {
  no_menu: boolean;
  no_back: boolean;
  no_forward: boolean;
}

const configDefault: JumperRendererConfig = {
  no_menu: false,
  no_back: false,
  no_forward: false,
};
class JumperRenderer {
  private _frameNavigator?: Jumper;

  constructor(private scene: Phaser.Scene) {}

  renderJumper(data: string, config: JumperRendererConfig) {
    this._frameNavigator?.destroy();
    if (data == null) {
      return;
    }

    const newConfig = { ...configDefault, ...config };

    this._frameNavigator = this._placeJumper(this.scene, data, newConfig);
    this._frameNavigator.setDepth(Number.MAX_SAFE_INTEGER);
  }

  private _placeJumper(
    scene: Phaser.Scene,
    data: string,
    config: JumperRendererConfig
  ) {
    const reactionToAdvance = config.no_forward
      ? () => {}
      : () => {
          this.scene.game.events.emit(
            'game-flow-event',
            'advance-to-frame',
            data
          );
        };
    const reactionToReturn = config.no_back
      ? reactionToAdvance
      : () => {
          this.scene.game.events.emit(
            'game-flow-event',
            'rollback-to-frame',
            data
          );
        };
    const reactionToMenu = config.no_menu
      ? reactionToAdvance
      : () => {
          this.scene.game.events.emit(
            'game-flow-event',
            'request-game-menu',
            data
          );
        };

    const customComponent = createJumper(scene, {
      reactionToAdvance,
      reactionToReturn,
      reactionToMenu,
    });
    scene.add.existing(customComponent);
    return customComponent;
  }

  public cleanup() {
    this._frameNavigator?.destroy();
  }
}
export { JumperRenderer };
export type { JumperRendererConfig };
