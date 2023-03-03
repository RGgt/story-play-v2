import {
  createButtonWithSimpleText,
  createCentralPanelBox,
  createLine,
} from '@rggt/nine-patch-controls';
import { createDialogTitleText } from '@rggt/basic-controls';
import { CommonWindowStyles, MainMenuStyles } from '@rggt/game-base';
import { DataModel } from './_types';

interface InnerStructure {
  background?: { destroy: () => void };
  titleText?: { destroy: () => void };
  topLine?: { destroy: () => void };
  buttonResume?: { destroy: () => void };
  buttonNew?: { destroy: () => void };
  buttonSaveLoad?: { destroy: () => void };
  buttonPreferences?: { destroy: () => void };
}
class View {
  private readonly SPACING = CommonWindowStyles.spacing;

  private readonly BUTTON_HEIGHT = CommonWindowStyles.dialogButton.height;

  private readonly LINE_TICKNESS = CommonWindowStyles.line.tickness;

  private readonly _dialogWidth: number;

  private readonly _contentStartX: number;

  private readonly _contentStartY: number;

  private readonly _contentStartWidth: number;

  private readonly _titleCenterX: number;

  private readonly _titleCenterY: number;

  public returnValue?: number;

  private innerStructure: InnerStructure;

  constructor(scene: Phaser.Scene, dataModel: DataModel) {
    this._dialogWidth = MainMenuStyles.mainWindow.width;
    const dialogTitleTextHeight = this.measureDialogTitleTextHeight(
      scene,
      this._dialogWidth,
      dataModel
    );
    const panelWindowBackgroundHeight =
      this.SPACING +
      dialogTitleTextHeight +
      this.SPACING +
      this.LINE_TICKNESS +
      this.SPACING +
      this.BUTTON_HEIGHT + // new
      this.SPACING +
      this.BUTTON_HEIGHT + // save/load
      this.SPACING +
      this.BUTTON_HEIGHT + // preferences
      this.SPACING +
      this.BUTTON_HEIGHT + // resume
      this.SPACING +
      this.SPACING;

    const background = createCentralPanelBox(scene, {
      width: this._dialogWidth,
      height: panelWindowBackgroundHeight,
    });
    const bkgRect = background.getBound();

    this._titleCenterX = background.getCenter().x;
    this._titleCenterY =
      background.getTop() + this.SPACING + dialogTitleTextHeight / 2;

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

    this._contentStartX = topLine.getLeft();
    this._contentStartY = topLine.getTop();
    this._contentStartWidth = topLine.getBound().width;

    const titleText = createDialogTitleText(scene, {
      x: this._titleCenterX,
      y: this._titleCenterY,
      maxWidth: this._dialogWidth - 2 * this.SPACING,
      text: dataModel.title,
    });

    const btn01Top = this._contentStartY + this.SPACING;
    const btn02Top = btn01Top + this.BUTTON_HEIGHT + this.SPACING;
    const btn03Top = btn02Top + this.BUTTON_HEIGHT + this.SPACING;
    const btn04Top =
      btn03Top + this.BUTTON_HEIGHT + this.SPACING + this.SPACING;
    const buttonNew = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX,
        y: btn01Top,
        width: this._contentStartWidth,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.callbackNew,
      },
      { text: dataModel.buttonTextNew }
    );
    const buttonSaveLoad = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX,
        y: btn02Top,
        width: this._contentStartWidth,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.callbackSaveLoad,
      },
      { text: dataModel.buttonTextSaveLoad }
    );
    const buttonPreferences = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX,
        y: btn03Top,
        width: this._contentStartWidth,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.callbackPreferences,
      },
      { text: dataModel.buttonTextPreferences }
    );

    const buttonResume = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX,
        y: btn04Top,
        width: this._contentStartWidth,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.callbackResume,
      },
      { text: dataModel.buttonTextResume }
    );

    this.innerStructure = {
      background,
      topLine,
      titleText,
      buttonNew,
      buttonSaveLoad,
      buttonPreferences,
      buttonResume,
    };
  }

  private measureDialogTitleTextHeight(
    scene: Phaser.Scene,
    dialogWidth: number,
    dataModel: DataModel
  ) {
    const tempText = createDialogTitleText(scene, {
      x: 0,
      y: 0,
      maxWidth: dialogWidth - 2 * this.SPACING,
      text: dataModel.title,
    });
    const textHeight = tempText.text.getBounds().height;
    tempText.destroy();
    return textHeight;
  }

  destroy() {
    this.innerStructure.background?.destroy();
    this.innerStructure.titleText?.destroy();
    this.innerStructure.topLine?.destroy();
    this.innerStructure.buttonResume?.destroy();
    this.innerStructure.buttonNew?.destroy();
    this.innerStructure.buttonSaveLoad?.destroy();
    this.innerStructure.buttonPreferences?.destroy();
  }
}

export { View };
