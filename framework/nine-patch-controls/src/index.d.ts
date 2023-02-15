declare module '@rggt/gui-elements';
export type { GroupBoxOptions } from './components/GroupBox/types';

export { GroupBox } from './components/GroupBox/control';
export { createGroupBox } from './components/GroupBox/main';

export type { PanelBoxOptions } from './components/PanelBox/types';
export { PanelBox } from './components/PanelBox/control';
export { createPanelBox } from './components/PanelBox/main';
export { createCentralPanelBox } from './components/PanelBox/templates';

export type { ButtonOptions } from './components/Button/types';
export { Button } from './components/Button/control';
export { createButton } from './components/Button/main';
export {
  createButtonWithSimpleText,
  createButtonWithIconAndText,
} from './composites/buttonsWithText';
// export { createSimpleButton } from './components/Button/templates';
