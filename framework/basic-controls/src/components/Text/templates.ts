import { TextStyle } from './types';
import { createText } from './main';

function createTitleText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  maxWidth: number
) {
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
  return createText(scene, x, y, text, maxWidth, style);
}

function createSubtitleTextAlignCenter(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  maxWidth: number
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
  return createText(scene, x, y, text, maxWidth, style);
}

function createSubtitleTextAlignRight(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  maxWidth: number
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
  return createText(scene, x, y, text, maxWidth, style);
}

function createNarrationTextColored(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  textColor: string,
  maxWidth: number
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
  return createText(scene, x, y, text, maxWidth, style);
}

function createNarrationText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  maxWidth: number
) {
  return createNarrationTextColored(scene, x, y, text, 'white', maxWidth);
}

function createScrollingLetterText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  maxWidth: number
) {
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
  return createText(scene, x, y, text, maxWidth, style);
}

function createSubtitleTextAlignLeft(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  maxWidth: number
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
  return createText(scene, x, y, text, maxWidth, style);
}

function createButtonText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  maxWidth: number
) {
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
  return createText(scene, x, y, text, maxWidth, style);
}

function createIconTextButtonText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  maxWidth: number
) {
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
  return createText(scene, x, y, text, maxWidth, style);
}

function createSaveButtonText(
  scene: Phaser.Scene,
  x: number,
  y: number,
  text: string | string[],
  maxWidth: number
) {
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
  return createText(scene, x, y, text, maxWidth, style);
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
