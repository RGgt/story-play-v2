import CursorScene from '../scenes/CursorScene';
import EScenes from '../scenes/EScenes';

const reactToCursorOption = (game: Phaser.Game, cursorOption: string) => {
  game.scene.start(EScenes.Cursor);
  const cursorScene = game.scene.getScene(EScenes.Cursor) as CursorScene;
  cursorScene.reactToCursorOption(cursorOption);
};
export { reactToCursorOption };
