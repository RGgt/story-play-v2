import {
  createButtonWithSimpleText,
  createCentralPanelBox,
  createLine,
} from '@rggt/nine-patch-controls';
import { createDialogTitleText } from '@rggt/basic-controls';
import { CommonWindowStyles } from '@rggt/game-base';
import { BehaviorModel, DataModel } from './_types';
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
}
class View {
  private readonly SPACING = CommonWindowStyles.spacing;

  private readonly BUTTON_HEIGHT = CommonWindowStyles.dialogButton.height;

  private readonly LINE_TICKNESS = CommonWindowStyles.line.tickness;

  public returnValue?: number;

  private innerStructure: InnerStructure;

  constructor(
    scene: Phaser.Scene,
    dataModel: DataModel,
    behaviorModel: BehaviorModel
  ) {
    const dialogWidth = getPageSlotsAreaWidth();
    const dialogTitleTextHeight = this.measureDialogTitleTextHeight(
      scene,
      dialogWidth,
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
      this.SPACING +
      this.BUTTON_HEIGHT +
      this.SPACING;

    const background = createCentralPanelBox(scene, {
      width: dialogWidth,
      height: panelWindowBackgroundHeight,
    });
    const bkgRect = background.getBound();
    const titleText = createDialogTitleText(scene, {
      x: background.getCenter().x,
      y: background.getTop() + this.SPACING + dialogTitleTextHeight / 2,
      maxWidth: dialogWidth - 2 * this.SPACING,
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

    const slotsArea = new GameSlotsArea(scene, {
      pageIndex: 0,
      x: topLine.getLeft(),
      y: topLine.getTop() + this.SPACING,
      slots: [
        {
          isEmptySlot: true,
        },
        {
          isEmptySlot: false,
          textureName: 'screenshot_0_5',
          labelText: 'save game slot #1\r\na line with some details',
        },
        {
          isEmptySlot: true,
        },
        {
          isEmptySlot: false,
          textureName: 'screenshot_0_5',
          labelText: 'Friday, October 15 2021\r\n23:42',
        },
        {
          isEmptySlot: true,
        },
        {
          isEmptySlot: true,
        },
      ],
    });

    const paginationArea = new PaginationSlotsArea(scene, {
      activePageIndex: 1,
      availableWidth: dialogWidth - 2 * this.SPACING,
      x: topLine.getLeft(),
      y:
        topLine.getTop() +
        this.SPACING +
        getPageSlotsAreaHeight() +
        this.SPACING,
      onPageChanged: () => {},
    });

    const button = createButtonWithSimpleText(
      scene,
      {
        x: topLine.getLeft(),
        y:
          topLine.getTop() +
          this.SPACING +
          getPageSlotsAreaHeight() +
          this.SPACING +
          getPaginationAreaHeight() +
          this.SPACING,
        width: bkgRect.width - 2 * this.SPACING,
        height: this.BUTTON_HEIGHT,
        // reactionToClick: behaviorModel.onButtonClick,
      },
      { text: dataModel.buttonTextClose }
    );

    this.innerStructure = {
      background,
      titleText,
      topLine,
      slotsArea,
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
    this.innerStructure.background.destroy();
    this.innerStructure.titleText.destroy();
    this.innerStructure.topLine.destroy();
  }
}

export { View };
