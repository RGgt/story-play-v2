interface IWindowController {
  createDialogWindow: (
    scene: Phaser.Scene,
    parameters: unknown,
    onDestroy: () => void,
    notifyControlsRecreated: () => void
  ) => Promise<void>;
}
export type { IWindowController };
