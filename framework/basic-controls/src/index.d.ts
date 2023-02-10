declare module '@rggt/basic-controls';

export type {
  VeryBasicProgressbar,
  VeryBasicProgressbarOptions,
} from './components/VeryBasicProgressbar/types';
export type { TextCoordType, TextStyle } from './components/Text/types';

export { createVeryBasicProgressbar } from './components/VeryBasicProgressbar/main';
export { createText } from './components/Text/main';
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
} from './components/Text/templates';
