function createBackgroundImage(scene: Phaser.Scene, name: string) {
  const screenCenterX =
    scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
  const screenCenterY =
    scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
  const sprite = scene.add.sprite(screenCenterX, screenCenterY, name);
  return { sprite };
}

function createBackgroundImagePulsing(
  scene: Phaser.Scene,
  name: string,
  config: { scale: number; speed: number; repeats: number; yoyo: boolean }
) {
  const screenCenterX =
    scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
  const screenCenterY =
    scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
  const sprite = scene.add.sprite(screenCenterX, screenCenterY, name);
  const pulseTween = scene.tweens.add({
    targets: sprite, // the image to animate
    scaleX: config.scale, // the target scale along the x-axis
    scaleY: config.scale, // the target scale along the y-axis
    ease: 'Sine.easeInOut',
    duration: config.speed,
    yoyo: config.yoyo, // make the animation go back and forth
    repeat: config.repeats, // repeat indefinitely
  });
  return { sprite, pulseTween };
}

function createBackgroundAnimation(
  scene: Phaser.Scene,
  name: string,
  config: { frames: string[]; repeats: number; frameRate: number }
) {
  const screenCenterX =
    scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
  const screenCenterY =
    scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
  const sprite = scene.add.sprite(screenCenterX, screenCenterY, name);
  const animationFrames = config.frames.map((frameName) => {
    return { key: frameName };
  });
  const animation = scene.anims.create({
    key: name,
    frames: animationFrames,
    frameRate: config.frameRate,
    repeat: config.repeats,
  });
  if (config.repeats < 0) {
    (animation as Phaser.Animations.Animation).repeat = -1;
  }
  sprite.play(name);
  return { sprite, animation };
}
export {
  createBackgroundImage,
  createBackgroundImagePulsing,
  createBackgroundAnimation,
};
