import {
  createButtonWithSimpleText,
  createCentralPanelBox,
  createLine,
} from '@rggt/nine-patch-controls';
import { createDialogText, createDialogTitleText } from '@rggt/basic-controls';
import { CommonWindowStyles } from '@rggt/game-base';
import { BehaviorModel, DataModel } from './_types';

class View {
  private readonly SPACING = CommonWindowStyles.spacing;

  private readonly BUTTON_HEIGHT = CommonWindowStyles.dialogButton.height;

  private readonly LINE_TICKNESS = CommonWindowStyles.line.tickness;

  public returnValue?: number;

  private innerStructure: {
    background: { destroy: () => void };
    titleText: { destroy: () => void };
    topLine: { destroy: () => void };
    dialogText: { destroy: () => void };
    button: { destroy: () => void };
  };

  constructor(
    scene: Phaser.Scene,
    dataModel: DataModel,
    behaviorModel: BehaviorModel
  ) {
    const dialogTextHeight = this.measureDialogTextHeight(scene, dataModel);
    const dialogTitleTextHeight = this.measureDialogTitleTextHeight(
      scene,
      dataModel
    );
    const panelWindowBackgroundHeight =
      this.SPACING +
      dialogTitleTextHeight +
      this.SPACING +
      this.LINE_TICKNESS +
      this.SPACING +
      dialogTextHeight +
      this.SPACING +
      this.BUTTON_HEIGHT +
      this.SPACING;

    const background = createCentralPanelBox(scene, {
      width: dataModel.width,
      height: panelWindowBackgroundHeight,
    });
    const bkgRect = background.getBound();
    const titleText = createDialogTitleText(scene, {
      x: background.getCenter().x,
      y: background.getTop() + this.SPACING + dialogTitleTextHeight / 2,
      maxWidth: dataModel.width - 2 * this.SPACING,
      text: dataModel.title,
    });
    const topLine = createLine(scene, {
      height: this.LINE_TICKNESS,
      width: bkgRect.width - 2 * this.SPACING,
      x: background.getLeft() + this.SPACING,
      y:
        background.getTop() +
        this.SPACING +
        dialogTitleTextHeight +
        this.SPACING,
    });
    const dialogText = createDialogText(scene, {
      x: topLine.getLeft(),
      y: topLine.getTop() + this.SPACING,
      maxWidth: bkgRect.width - 2 * this.SPACING,
      text: dataModel.message,
    });
    const button = createButtonWithSimpleText(
      scene,
      {
        x: topLine.getLeft(),
        y: dialogText.text.getBounds().bottom + this.SPACING,
        width: bkgRect.width - 2 * this.SPACING,
        height: this.BUTTON_HEIGHT,
        text: dataModel.message,
        reactionToClick: behaviorModel.onButtonClick,
      },
      { text: dataModel.buttonText }
    );
    this.innerStructure = {
      background,
      titleText,
      topLine,
      dialogText,
      button,
    };
  }

  private measureDialogTextHeight(scene: Phaser.Scene, dataModel: DataModel) {
    const tempText = createDialogText(scene, {
      x: 0,
      y: 0,
      maxWidth: dataModel.width - 2 * this.SPACING,
      text: dataModel.message,
    });
    const textHeight = tempText.text.getBounds().bottom;
    tempText.text.destroy();
    return textHeight;
  }

  private measureDialogTitleTextHeight(
    scene: Phaser.Scene,
    dataModel: DataModel
  ) {
    const tempText = createDialogTitleText(scene, {
      x: 0,
      y: 0,
      maxWidth: dataModel.width - 2 * this.SPACING,
      text: dataModel.title,
    });
    const textHeight = tempText.text.getBounds().height;
    tempText.text.destroy();
    return textHeight;
  }

  destroy() {
    this.innerStructure.background.destroy();
    this.innerStructure.titleText.destroy();
    this.innerStructure.topLine.destroy();
    this.innerStructure.dialogText.destroy();
    this.innerStructure.button.destroy();
  }
}

export { View };
