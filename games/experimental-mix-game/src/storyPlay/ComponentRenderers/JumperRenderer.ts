import { createJumper, Jumper } from '@rggt/basic-controls';

class JumperRenderer {
  private _frameNavigator?: Jumper;

  constructor(private scene: Phaser.Scene) {}

  renderJumper(data: string, config: object) {
    if (data == null) {
      this._frameNavigator?.destroy();
      return;
    }
    const configDefault = {
      no_menu: false,
      no_back: false,
    };
    const newConfig = { ...configDefault, ...config };

    this._frameNavigator = this._placeJumper(this.scene, data, newConfig);
    this._frameNavigator.setDepth(Number.MAX_SAFE_INTEGER);
  }

  private _placeJumper(
    scene: Phaser.Scene,
    data: string,
    config: { no_menu: boolean; no_back: boolean }
  ) {
    const reactionToAdvance = () => {
      this.scene.game.events.emit('game-flow-event', 'advance-to-frame', data);
    };
    const reactionToReturn = () => {
      this.scene.game.events.emit('game-flow-event', 'rollback-to-frame', data);
    };
    const reactionToMenu = () => {
      this.scene.game.events.emit('game-flow-event', 'request-game-menu', data);
    };

    const customComponent = createJumper(scene, {
      reactionToAdvance,
      reactionToReturn: config.no_back ? reactionToAdvance : reactionToReturn,
      reactionToMenu: config.no_menu ? reactionToAdvance : reactionToMenu,
    });
    scene.add.existing(customComponent);
    return customComponent;
  }

  public cleanup() {
    this._frameNavigator?.destroy();
  }
}
export { JumperRenderer };
