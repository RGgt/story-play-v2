import { TextOptions, TextStyle } from './types';
import { createText } from './main';

function createTitleText(scene: Phaser.Scene, options: TextOptions) {
  const style: TextStyle = {
    shadowColor: '#000000',
    shadowBlur: 4,
    shadowOffsetX: 4,
    shadowOffsetY: 4,
    textSize: '72px',
    textFontFamily: 'SerifFont',
    textColor: 'white',
    textBackgroundColor: 'transparent',
    outlineTickness: 8,
    outlineColor: 'black',
    alignment: 'center',
    coords: 'MiddleCenter',
  };
  return createText(scene, options, style);
}

function createSubtitleTextAlignCenter(
  scene: Phaser.Scene,
  options: TextOptions
) {
  const style: TextStyle = {
    shadowColor: '#000000',
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    textSize: '36px',
    textFontFamily: 'SerifFont',
    textColor: 'white',
    textBackgroundColor: 'transparent',
    outlineTickness: 8,
    outlineColor: 'black',
    alignment: 'center',
    coords: 'TopCenter',
  };
  return createText(scene, options, style);
}

function createSubtitleTextAlignRight(
  scene: Phaser.Scene,
  options: TextOptions
) {
  const style: TextStyle = {
    shadowColor: '#000000',
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    textSize: '36px',
    textFontFamily: 'SerifFont',
    textColor: 'white',
    textBackgroundColor: 'transparent',
    outlineTickness: 8,
    outlineColor: 'black',
    alignment: 'right',
    coords: 'TopRight',
  };
  return createText(scene, options, style);
}

function createNarrationTextColored(
  scene: Phaser.Scene,
  options: TextOptions,
  textColor: string
) {
  const style: TextStyle = {
    shadowColor: '#000000',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textSize: '36px',
    textFontFamily: 'SerifFont',
    textColor,
    textBackgroundColor: 'transparent',
    outlineTickness: 6,
    outlineColor: 'black',
    alignment: 'left',
    coords: 'TopLeft',
  };
  return createText(scene, options, style);
}

function createNarrationText(scene: Phaser.Scene, options: TextOptions) {
  return createNarrationTextColored(scene, options, 'white');
}

function createScrollingLetterText(scene: Phaser.Scene, options: TextOptions) {
  const style: TextStyle = {
    shadowColor: '#000000',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textSize: '36px',
    textFontFamily: 'SerifFont',
    textColor: 'white',
    textBackgroundColor: 'transparent',
    outlineTickness: 6,
    outlineColor: 'black',
    alignment: 'center',
    coords: 'TopCenter',
  };
  return createText(scene, options, style);
}

function createSubtitleTextAlignLeft(
  scene: Phaser.Scene,
  options: TextOptions
) {
  const style: TextStyle = {
    shadowColor: '#000000',
    shadowBlur: 4,
    shadowOffsetX: 2,
    shadowOffsetY: 2,
    textSize: '36px',
    textFontFamily: 'SerifFont',
    textColor: 'white',
    textBackgroundColor: 'transparent',
    outlineTickness: 8,
    outlineColor: 'black',
    alignment: 'left',
    coords: 'TopLeft',
  };
  return createText(scene, options, style);
}

function createButtonText(scene: Phaser.Scene, options: TextOptions) {
  const style: TextStyle = {
    shadowColor: '#000000',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textSize: '36px',
    textFontFamily: 'SerifFont',
    textColor: 'white',
    textBackgroundColor: 'transparent',
    outlineTickness: 2,
    outlineColor: 'black',
    alignment: 'center',
    coords: 'MiddleCenter',
  };
  return createText(scene, options, style);
}

function createIconTextButtonText(scene: Phaser.Scene, options: TextOptions) {
  const style: TextStyle = {
    shadowColor: '#000000',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textSize: '36px',
    textFontFamily: 'SerifFont',
    textColor: 'white',
    textBackgroundColor: 'transparent',
    outlineTickness: 2,
    outlineColor: 'black',
    alignment: 'center',
    coords: 'MiddleLeft',
  };
  return createText(scene, options, style);
}

function createSaveButtonText(scene: Phaser.Scene, options: TextOptions) {
  const style: TextStyle = {
    shadowColor: '#000000',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textSize: '24px',
    textFontFamily: 'SerifBoldFont',
    textColor: 'white',
    textBackgroundColor: 'transparent',
    outlineTickness: 2,
    outlineColor: 'black',
    alignment: 'center',
    coords: 'MiddleCenter',
  };
  return createText(scene, options, style);
}

export {
  createTitleText,
  createSubtitleTextAlignCenter,
  createSubtitleTextAlignRight,
  createNarrationTextColored,
  createNarrationText,
  createScrollingLetterText,
  createSubtitleTextAlignLeft,
  createButtonText,
  createIconTextButtonText,
  createSaveButtonText,
};
