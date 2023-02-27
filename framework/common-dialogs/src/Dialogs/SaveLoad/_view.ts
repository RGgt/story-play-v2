import {
  createButtonWithSimpleText,
  createCentralPanelBox,
  createGroupBox,
  createLine,
} from '@rggt/nine-patch-controls';
import { createDialogTitleText } from '@rggt/basic-controls';
import { CommonWindowStyles, SaveAndLoadStyles } from '@rggt/game-base';
import { DataModel } from './_types';
import {
  getPageSlotsAreaHeight,
  getPageSlotsAreaWidth,
} from './components/gameSlotsArea/main';
import { GameSlotsArea } from './components/gameSlotsArea/control';
import { PaginationSlotsArea } from './components/paginationArea/control';
import { getPaginationAreaHeight } from './components/paginationArea/main';

interface InnerStructure {
  background: { destroy: () => void };
  titleText: { destroy: () => void };
  topLine: { destroy: () => void };
  slotsArea: { destroy: () => void };
  paginationArea: { destroy: () => void };
  buttonClose: { destroy: () => void };
  buttonSave: { destroy: () => void };
  buttonLoad: { destroy: () => void };
  buttonDelete: { destroy: () => void };
  leftPanelBox: { destroy: () => void };
}
class View {
  private readonly SPACING = CommonWindowStyles.spacing;

  private readonly BUTTON_HEIGHT = CommonWindowStyles.dialogButton.height;

  private readonly LINE_TICKNESS = CommonWindowStyles.line.tickness;

  private readonly _dialogWidth: number;

  private readonly _contentStartX: number;

  private readonly _contentStartY: number;

  public returnValue?: number;

  private innerStructure: InnerStructure;

  constructor(scene: Phaser.Scene, dataModel: DataModel) {
    this._dialogWidth = getPageSlotsAreaWidth();
    const leftPlaneWidth = SaveAndLoadStyles.leftPanel.width + this.SPACING;
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
      getPageSlotsAreaHeight() +
      this.SPACING +
      getPaginationAreaHeight() +
      // this.SPACING +
      // this.BUTTON_HEIGHT +
      this.SPACING;

    const background = createCentralPanelBox(scene, {
      width: this._dialogWidth + leftPlaneWidth,
      height: panelWindowBackgroundHeight,
    });
    const bkgRect = background.getBound();
    const titleText = createDialogTitleText(scene, {
      x: background.getCenter().x,
      y: background.getTop() + this.SPACING + dialogTitleTextHeight / 2,
      maxWidth: this._dialogWidth - 2 * this.SPACING,
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

    this._contentStartX = topLine.getLeft();
    this._contentStartY = topLine.getTop();

    const leftPanelBox = createGroupBox(scene, {
      x: this._contentStartX,
      y: this._contentStartY + this.SPACING,
      width: SaveAndLoadStyles.leftPanel.width,
      height:
        getPageSlotsAreaHeight() + this.SPACING + getPaginationAreaHeight(),
    });

    const slotsArea = new GameSlotsArea(scene, {
      pageIndex: dataModel.pageIndex,
      x: this._contentStartX + leftPlaneWidth,
      y: this._contentStartY + this.SPACING,
      slots: dataModel.saveSlots,
      onSlotClicked: dataModel.onSaveToSlot,
    });

    const paginationArea = new PaginationSlotsArea(scene, {
      activePageIndex: dataModel.pageIndex,
      availableWidth: this._dialogWidth - 2 * this.SPACING,
      x: this._contentStartX + leftPlaneWidth,
      y:
        this._contentStartY +
        this.SPACING +
        getPageSlotsAreaHeight() +
        this.SPACING,
      onPageChanged: dataModel.onPageChanged,
    });

    const buttonClose = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX + this.SPACING,
        y: leftPanelBox.getBottom() - this.BUTTON_HEIGHT - this.SPACING,
        width: SaveAndLoadStyles.leftPanel.width - 2 * this.SPACING,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.onButtonClickClose,
      },
      { text: 'Return' }
    );

    const buttonSave = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX + this.SPACING,
        y: leftPanelBox.getTop() + this.SPACING,
        width: SaveAndLoadStyles.leftPanel.width - 2 * this.SPACING,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.onButtonClickActivateSave,
      },
      { text: 'Save' }
    );
    buttonSave.button.Pushed = true;

    const buttonLoad = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX + this.SPACING,
        y:
          leftPanelBox.getTop() +
          this.SPACING +
          this.BUTTON_HEIGHT +
          this.SPACING,
        width: SaveAndLoadStyles.leftPanel.width - 2 * this.SPACING,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.onButtonClickClose,
      },
      { text: 'Load' }
    );

    const buttonDelete = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX + this.SPACING,
        y:
          leftPanelBox.getTop() +
          this.SPACING +
          this.BUTTON_HEIGHT +
          this.SPACING +
          this.BUTTON_HEIGHT +
          this.SPACING,
        width: SaveAndLoadStyles.leftPanel.width - 2 * this.SPACING,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.onButtonClickClose,
      },
      { text: 'Delete' }
    );

    this.innerStructure = {
      background,
      titleText,
      topLine,
      slotsArea,
      paginationArea,
      buttonClose,
      buttonSave,
      buttonLoad,
      buttonDelete,
      leftPanelBox,
    };
  }

  public updateOnPageChanged(scene: Phaser.Scene, dataModel: DataModel) {
    const leftPlaneWidth = SaveAndLoadStyles.leftPanel.width + this.SPACING;
    this.innerStructure.slotsArea.destroy();
    this.innerStructure.slotsArea = new GameSlotsArea(scene, {
      pageIndex: dataModel.pageIndex,
      x: this._contentStartX + leftPlaneWidth,
      y: this._contentStartY + this.SPACING,
      slots: dataModel.saveSlots,
      onSlotClicked: dataModel.onSaveToSlot,
    });

    this.innerStructure.paginationArea.destroy();
    this.innerStructure.paginationArea = new PaginationSlotsArea(scene, {
      activePageIndex: dataModel.pageIndex,
      availableWidth: this._dialogWidth - 2 * this.SPACING,
      x: this._contentStartX + leftPlaneWidth,
      y:
        this._contentStartY +
        this.SPACING +
        getPageSlotsAreaHeight() +
        this.SPACING,
      onPageChanged: dataModel.onPageChanged,
    });
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
    this.innerStructure.background.destroy();
    this.innerStructure.titleText.destroy();
    this.innerStructure.topLine.destroy();
    this.innerStructure.slotsArea.destroy();
    this.innerStructure.paginationArea.destroy();
    this.innerStructure.buttonClose.destroy();
    this.innerStructure.buttonSave.destroy();
    this.innerStructure.buttonLoad.destroy();
    this.innerStructure.buttonDelete.destroy();
    this.innerStructure.leftPanelBox.destroy();
  }
}

export { View };
