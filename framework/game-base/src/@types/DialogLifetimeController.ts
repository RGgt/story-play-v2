import Phaser from 'phaser';

interface DialogLifetimeController {
  createDialog: (
    scene: Phaser.Scene,
    zIndex: number,
    dialogOptions: unknown
  ) => void;
  destroy: () => void;
}

export type { DialogLifetimeController };
