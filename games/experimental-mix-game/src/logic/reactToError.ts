import CriticalErrorScene from '../scenes/CriticalErrorScene';
import EScenes from '../scenes/EScenes';

const reactToError = (game: Phaser.Game, err: unknown) => {
  const e = err as Error;
  if (!e) {
    reactToError(game, new Error('Invalid error!'));
    return;
  }
  game.scene.start(EScenes.CriticalError);
  const errorScene = game.scene.getScene(
    EScenes.CriticalError
  ) as CriticalErrorScene;
  errorScene.setErrorMessage(e.message);
  game.scene.getScenes(true, false).forEach((scene) => {
    game.scene.pause(scene);
  });
};
export { reactToError };
