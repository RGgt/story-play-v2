import { DialogLifetimeController } from './DialogLifetimeController';

interface GameReactions {
  reactToError: (err: unknown) => void;
  reactToCursorOption: (cursorOption: string) => void;
  reactToNewDialogRequest: (
    lifetimeController: DialogLifetimeController
  ) => void;
}

export type { GameReactions };
