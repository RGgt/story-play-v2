interface IWindowController {
  createDialogWindow: (
    scene: Phaser.Scene,
    parameters: unknown,
    onDestroy: () => void
  ) => Promise<void>;
}
export type { IWindowController };
