import { GameConfiguration } from '@rggt/game-base';
import { CustomGameState } from '../state/CustomGameState';
import { CustomStableData } from '../state/CustomStableData';
import { FrameRenderer } from './FrameRenderer';

class GameFlowPlayer {
  // private _state = this._getState();

  private get _state() {
    return GameConfiguration.stateAccessor.getStateObject() as CustomGameState;
  }

  private get _stable() {
    return GameConfiguration.stableDataAccessor.getStableData() as CustomStableData;
  }

  private readonly _frameRenderer: FrameRenderer;

  constructor(private scene: Phaser.Scene) {
    this._frameRenderer = new FrameRenderer(this.scene);
  }

  public restartGame() {
    this._state.currentFrame = this._stable.startingFrame;
    this._state.history = [] as string[];
    this._state.history.push(this._state.currentFrame);
    const frameData = this._getFrameData();
    this._frameRenderer.advanceToFrame(frameData);
  }

  public loadGame() {
    // no need to set current frame, as it
    // is already set by 'Load' mechanism
    const frameData = this._getFrameData();
    // 'Refresh', not 'Advance', as the updates
    // to state caused by reaching this page were
    // already processed before saving.
    this._frameRenderer.refreshFrame(frameData);
  }

  public advanceToFrame(data: string) {
    this._state.currentFrame = data;
    this._state.history.push(this._state.currentFrame);
    const frameData = this._getFrameData();
    this._frameRenderer.advanceToFrame(frameData);
  }

  public rollbackToFrame() {
    if (this._state.history && this._state.history.length > 1) {
      this._state.history.pop();
      this._state.currentFrame =
        this._state.history.at(this._state.history.length - 1) ?? '';
      const frameData = this._getFrameData();
      this._frameRenderer.rollbackToFrame(frameData);
    }
  }

  private _getFrameData() {
    const frameData = this._stable.frames.find(
      (frame) => frame.code === this._state.currentFrame
    );
    if (!frameData) throw new Error('Invalid frame code!');
    return frameData;
  }
}
export { GameFlowPlayer };
