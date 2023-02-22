declare module '@rggt/basic-controls';

export type {
  VeryBasicProgressbar,
  VeryBasicProgressbarOptions,
} from './components/VeryBasicProgressbar/types';
export type {
  TextCoordType,
  TextStyle,
  TextOptions,
} from './components/Text/types';

export { createVeryBasicProgressbar } from './components/VeryBasicProgressbar/main';
export { HoledBackgroundBlocker } from './components/HoledBackgroundBlocker/control';
export { createHoledBackgroundBlocker } from './components/HoledBackgroundBlocker/main';
export { Perimeter } from './components/Perimeter/control';
export { createPerimeter } from './components/Perimeter/main';
export { createText } from './components/Text/main';
export { Highlightable } from './components/Highlightable/control';
export { createHighlightable } from './components/Highlightable/main';
export { Colored } from './components/Colored/control';
export { createColored } from './components/Colored/main';
export {
  createBackgroundImage,
  createBackgroundImagePulsing,
  createBackgroundAnimation,
} from './components/Background/main';
export {
  createTitleText,
  createSubtitleTextAlignCenter,
  createSubtitleTextAlignRight,
  createNarrationText,
  createScrollingLetterText,
  createSubtitleTextAlignLeft,
  createButtonText,
  createButtonSubText,
  createIconTextButtonText,
  createSaveButtonText,
  createDialogTitleText,
  createDialogText,
} from './components/Text/templates';
