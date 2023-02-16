interface IWindowController {
  createDialogWindow: (
    scene: Phaser.Scene,
    parameters: unknown,
    onDestroy: () => void
  ) => void;
}
export type { IWindowController };
