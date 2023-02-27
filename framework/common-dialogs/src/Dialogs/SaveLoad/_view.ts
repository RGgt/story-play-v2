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
  background?: { destroy: () => void };
  titleText?: { destroy: () => void };
  topLine?: { destroy: () => void };
  slotsArea?: { destroy: () => void };
  paginationArea?: { destroy: () => void };
  buttonClose?: { destroy: () => void };
  buttonSave?: { destroy: () => void };
  buttonLoad?: { destroy: () => void };
  buttonDelete?: { destroy: () => void };
  leftPanelBox?: { destroy: () => void };
}
class View {
  private readonly SPACING = CommonWindowStyles.spacing;

  private readonly BUTTON_HEIGHT = CommonWindowStyles.dialogButton.height;

  private readonly LINE_TICKNESS = CommonWindowStyles.line.tickness;

  private readonly _dialogWidth: number;

  private readonly _contentStartX: number;

  private readonly _contentStartY: number;

  private readonly _leftPanelY: number;

  private readonly _titleCenterX: number;

  private readonly _titleCenterY: number;

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
      this.SPACING;

    const background = createCentralPanelBox(scene, {
      width: this._dialogWidth + leftPlaneWidth,
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

    const leftPanelBox = createGroupBox(scene, {
      x: this._contentStartX,
      y: this._contentStartY + this.SPACING,
      width: SaveAndLoadStyles.leftPanel.width,
      height:
        getPageSlotsAreaHeight() + this.SPACING + getPaginationAreaHeight(),
    });
    this._leftPanelY = leftPanelBox.getTop();

    this.innerStructure = {};

    this.updateOnViewModeChanged(scene, dataModel);

    const buttonClose = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX + this.SPACING,
        y: leftPanelBox.getBottom() - this.BUTTON_HEIGHT - this.SPACING,
        width: SaveAndLoadStyles.leftPanel.width - 2 * this.SPACING,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.onButtonClickClose,
      },
      { text: dataModel.buttonTextClose }
    );

    this.innerStructure = {
      ...this.innerStructure,
      background,
      topLine,
      buttonClose,
      leftPanelBox,
    };
  }

  public updateOnViewModeChanged(scene: Phaser.Scene, dataModel: DataModel) {
    if (this.innerStructure.buttonSave)
      this.innerStructure.buttonSave.destroy();
    if (this.innerStructure.buttonLoad)
      this.innerStructure.buttonLoad.destroy();
    if (this.innerStructure.buttonDelete)
      this.innerStructure.buttonDelete.destroy();
    if (this.innerStructure.titleText) this.innerStructure.titleText.destroy();

    let title;
    switch (dataModel.viewMode) {
      case 'save':
        title = dataModel.titleSave;
        break;
      case 'load':
        title = dataModel.titleLoad;
        break;
      case 'delete':
        title = dataModel.titleDelete;
        break;
      default:
        throw new Error('Invalid view mode!');
    }
    const titleText = createDialogTitleText(scene, {
      x: this._titleCenterX,
      y: this._titleCenterY,
      maxWidth: this._dialogWidth - 2 * this.SPACING,
      text: title,
    });
    const buttonSave = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX + this.SPACING,
        y: this._leftPanelY + this.SPACING,
        width: SaveAndLoadStyles.leftPanel.width - 2 * this.SPACING,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.onButtonClickActivateSave,
      },
      { text: dataModel.buttonTextSave }
    );
    buttonSave.button.Pushed = dataModel.viewMode === 'save';

    const buttonLoad = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX + this.SPACING,
        y: this._leftPanelY + this.SPACING + this.BUTTON_HEIGHT + this.SPACING,
        width: SaveAndLoadStyles.leftPanel.width - 2 * this.SPACING,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.onButtonClickActivateLoad,
      },
      { text: dataModel.buttonTextLoad }
    );
    buttonLoad.button.Pushed = dataModel.viewMode === 'load';

    const buttonDelete = createButtonWithSimpleText(
      scene,
      {
        x: this._contentStartX + this.SPACING,
        y:
          this._leftPanelY +
          this.SPACING +
          this.BUTTON_HEIGHT +
          this.SPACING +
          this.BUTTON_HEIGHT +
          this.SPACING,
        width: SaveAndLoadStyles.leftPanel.width - 2 * this.SPACING,
        height: this.BUTTON_HEIGHT,
        reactionToClick: dataModel.onButtonClickActivateDelete,
      },
      { text: dataModel.buttonTextDelete }
    );
    buttonDelete.button.Pushed = dataModel.viewMode === 'delete';

    this.innerStructure.buttonSave = buttonSave;
    this.innerStructure.buttonLoad = buttonLoad;
    this.innerStructure.buttonDelete = buttonDelete;
    this.innerStructure.titleText = titleText;

    this.updateOnPageChanged(scene, dataModel);
  }

  public updateOnPageChanged(scene: Phaser.Scene, dataModel: DataModel) {
    const leftPlaneWidth = SaveAndLoadStyles.leftPanel.width + this.SPACING;
    if (this.innerStructure.slotsArea) this.innerStructure.slotsArea.destroy();
    let onSlotClicked: (pageIndex: number, slotIndex: number) => void;
    switch (dataModel.viewMode) {
      case 'save':
        onSlotClicked = dataModel.onSaveToSlot;
        break;
      case 'load':
        onSlotClicked = dataModel.onLoadFromSlot;
        break;
      case 'delete':
        onSlotClicked = dataModel.onDeleteFromSlot;
        break;
      default:
        throw new Error('Invalid view mode!');
    }
    this.innerStructure.slotsArea = new GameSlotsArea(scene, {
      pageIndex: dataModel.pageIndex,
      x: this._contentStartX + leftPlaneWidth,
      y: this._contentStartY + this.SPACING,
      slots: dataModel.saveSlots,
      slotTextEmpty: dataModel.slotTextEmpty,
      viewMode: dataModel.viewMode,
      onSlotClicked,
    });

    if (this.innerStructure.paginationArea)
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
      text: dataModel.titleSave,
    });
    const textHeight = tempText.text.getBounds().height;
    tempText.destroy();
    return textHeight;
  }

  destroy() {
    this.innerStructure.background?.destroy();
    this.innerStructure.titleText?.destroy();
    this.innerStructure.topLine?.destroy();
    this.innerStructure.slotsArea?.destroy();
    this.innerStructure.paginationArea?.destroy();
    this.innerStructure.buttonClose?.destroy();
    this.innerStructure.buttonSave?.destroy();
    this.innerStructure.buttonLoad?.destroy();
    this.innerStructure.buttonDelete?.destroy();
    this.innerStructure.leftPanelBox?.destroy();
  }
}

export { View };
