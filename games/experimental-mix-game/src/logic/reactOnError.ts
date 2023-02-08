import CriticalErrorScene from '../scenes/CriticalErrorScene';
import EScenes from '../scenes/EScenes';

const reactOnError = (game: Phaser.Game, err: Error) => {
  game.scene.start(EScenes.CriticalError);
  const errorScene = game.scene.getScene(
    EScenes.CriticalError
  ) as CriticalErrorScene;
  errorScene.setErrorMessage(err.message);
  game.scene.getScenes(true, false).forEach((scene) => {
    game.scene.pause(scene);
  });
};
export { reactOnError };
