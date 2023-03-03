import { GameConfiguration } from '@rggt/game-base';
import { ComponentData, FrameData } from '../state/CustomStableData';
import {
  BackgroundRenderer,
  BackgroundRendererConfig,
} from './ComponentRenderers/BackgroundRenderer';
import {
  JumperRenderer,
  JumperRendererConfig,
} from './ComponentRenderers/JumperRenderer';
import { LargeTextsRenderer } from './ComponentRenderers/LargeTextsRenderer';
import { NarratorRenderer } from './ComponentRenderers/NarratorRenderer';
import { QuickText } from './ComponentRenderers/QuickText';
import { ImplicitStateUpdater } from './StateUpdaters/ImplicitStateUpdater';

class FrameRenderer {
  private readonly _backgroundRenderer: BackgroundRenderer;

  private readonly _narrationRenderer: NarratorRenderer;

  private readonly _jumperRenderer: JumperRenderer;

  private readonly _largeTextsRenderer: LargeTextsRenderer;

  private readonly _quickText: QuickText;

  private readonly _stateUpdatesProcessor: ImplicitStateUpdater;

  private readonly _pastFrameComponents: Set<string>;

  constructor(private scene: Phaser.Scene) {
    this._backgroundRenderer = new BackgroundRenderer(this.scene);
    this._narrationRenderer = new NarratorRenderer(this.scene);
    this._jumperRenderer = new JumperRenderer(this.scene);
    this._largeTextsRenderer = new LargeTextsRenderer(this.scene);
    this._quickText = new QuickText(this.scene);
    this._stateUpdatesProcessor = new ImplicitStateUpdater(this.scene);
    this._pastFrameComponents = new Set<string>();
  }

  private _renderFrame(
    frameData: FrameData,
    updateState: 'yes' | 'undo' | 'no'
  ) {
    // remove the components to which we may play transitions
    frameData.components.forEach((value) => {
      const componentCode = value.code;
      if (this._pastFrameComponents.has(componentCode))
        this._pastFrameComponents.delete(componentCode);
    });

    // cleanup whatever remained
    this._pastFrameComponents.forEach((value) => {
      this._cleanupComponent(value);
    });

    // render the new components
    try {
      frameData.components.forEach((value, index) =>
        this._renderComponent(value, index, updateState)
      );
    } catch (err: unknown) {
      GameConfiguration.gameReactions.reactToError(err as Error);
    }
  }

  public advanceToFrame(frameData: FrameData) {
    this._renderFrame(frameData, 'yes');
  }

  public rollbackToFrame(frameData: FrameData) {
    this._renderFrame(frameData, 'undo');
  }

  public refreshFrame(frameData: FrameData) {
    this._renderFrame(frameData, 'no');
  }

  private _cleanupComponent(componentCode: string) {
    switch (componentCode) {
      case 'background':
        this._backgroundRenderer.cleanup();
        break;
      case 'jumper':
        this._jumperRenderer.cleanup();
        break;
      case 'narration':
        this._narrationRenderer.cleanup();
        break;
      case 'story-title':
        this._largeTextsRenderer.cleanup();
        break;
      case 'quick-text':
        this._quickText.cleanup();
        break;
      case 'story-subtitle-center':
        this._largeTextsRenderer.cleanup();
        break;
      case 'state-update':
        // nothing
        break;
      default:
        throw new Error(`Invalid component code '${componentCode}'`);
    }
  }

  private _renderComponent(
    componentData: ComponentData,
    index: number,
    updateState: 'yes' | 'undo' | 'no'
  ) {
    if (!this._pastFrameComponents.has(componentData.code))
      this._pastFrameComponents.add(componentData.code);
    switch (componentData.code) {
      case 'background':
        this._backgroundRenderer.renderBackground(
          componentData.data,
          componentData.config as BackgroundRendererConfig,
          index
        );
        break;
      case 'jumper':
        this._jumperRenderer.renderJumper(
          componentData.data,
          componentData.config as JumperRendererConfig
        );
        break;
      case 'narration':
        this._narrationRenderer.renderNarration(
          componentData.data,
          componentData.config,
          index
        );
        break;
      case 'story-title':
        this._largeTextsRenderer.renderStoryTitle(componentData.data, index);
        break;
      case 'quick-text':
        this._quickText.renderQuickText(componentData.data, index);
        break;
      case 'story-subtitle-center':
        this._largeTextsRenderer.renderStorySubtitleCenter(
          componentData.data,
          componentData.config,
          index
        );
        break;
      case 'state-update':
        this._stateUpdatesProcessor.processUpdates(
          componentData.data,
          updateState
        );
        break;
      default:
        throw new Error(`Invalid component code '${componentData.code}'`);
    }
  }
}
export { FrameRenderer };
