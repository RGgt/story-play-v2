import {
  createBackgroundAnimation,
  createBackgroundImage,
  createBackgroundImagePulsing,
} from '@rggt/basic-controls';

class BackgroundRenderer {
  private _backgroundSprite?: Phaser.GameObjects.Sprite;

  private _backgroundSpriteOld?: Phaser.GameObjects.Sprite;

  private _backgroundFadeOutTween?: Phaser.Tweens.Tween;

  private _backgroundFadeInTween?: Phaser.Tweens.Tween;

  private _backgroundPulseTween: Phaser.Tweens.Tween | undefined;

  private _backgroundAnimation: Phaser.Animations.Animation | false = false;

  constructor(private scene: Phaser.Scene) {}

  public renderBackground(data: string, index: number) {
    if (data == null) {
      this._backgroundFadeOutTween?.stop();
      this._backgroundFadeInTween?.stop();
      this._backgroundSpriteOld?.destroy();
      this._backgroundSprite?.destroy();
      return;
    }
    if (this._backgroundPulseTween) {
      this._backgroundPulseTween.stop();
      this._backgroundPulseTween.remove();
    }
    if (this._backgroundSprite) {
      // if already fading (a past background change not finalized yet)
      if (this._backgroundFadeOutTween) {
        // stop transition finalize old transition first
        this._backgroundSpriteOld?.destroy();
        // Note: just stop it. onStop will call onComplete!
        this._backgroundFadeOutTween.stop();
      }
      if (this._backgroundFadeInTween) {
        // Note: just stop it. onStop will call onComplete!
        this._backgroundFadeInTween.stop();
      }
      // lift up old background
      const depthOld = this._backgroundSprite.depth + 5;
      this._backgroundSpriteOld = this._backgroundSprite;
      this._backgroundSpriteOld.setDepth(depthOld);
      // create new background below it
      ({ background: this._backgroundSprite } = createBackgroundImage(
        this.scene,
        data
      ));
      this._backgroundSprite.setDepth(index * 10);
      this._backgroundSprite.setAlpha(1);
      // fade out the old background
      this._backgroundFadeOutTween = this.scene.tweens.add({
        targets: this._backgroundSpriteOld, // the image to animate
        alpha: { from: 1, to: 0 },
        ease: 'Cubic.EaseOut',
        duration: 1000,
        yoyo: false,
        repeat: 0, // no repeat
        onComplete: () => {
          if (this._backgroundFadeOutTween) {
            this._backgroundFadeOutTween.remove();
            this._backgroundFadeOutTween = undefined;
            this._backgroundSpriteOld?.destroy();
          }
        },
      });
      this._backgroundFadeInTween = this.scene.tweens.add({
        targets: this._backgroundSprite, // the image to animate
        alpha: { from: 0, to: 1 },
        ease: 'Cubic.EaseOut',
        duration: 1000,
        yoyo: false,
        repeat: 0, // no repeat
        onComplete: () => {
          if (this._backgroundFadeInTween) {
            this._backgroundFadeInTween.remove();
            this._backgroundFadeInTween = undefined;
          }
        },
      });
    } else {
      ({ background: this._backgroundSprite } = createBackgroundImage(
        this.scene,
        data
      ));
      this._backgroundSprite.setDepth(index * 10);
    }
  }

  renderBackgroundPulse(data: string, config: object, index: number) {
    if (data == null) {
      this._backgroundFadeOutTween?.stop();
      this._backgroundFadeInTween?.stop();
      this._backgroundSpriteOld?.destroy();
      this._backgroundSprite?.destroy();
      return;
    }
    if (this._backgroundPulseTween) {
      this._backgroundPulseTween.stop();
      this._backgroundPulseTween.remove();
    }
    if (this._backgroundSprite) {
      // if already fading (a past background change not finalized yet)
      if (this._backgroundFadeOutTween) {
        // stop transition finalize old transition first
        this._backgroundSpriteOld?.destroy();
        // Note: just stop it. onStop will call onComplete!
        this._backgroundFadeOutTween.stop();
      }
      if (this._backgroundFadeInTween) {
        // Note: just stop it. onStop will call onComplete!
        this._backgroundFadeInTween.stop();
      }
      // lift up old background
      const depthOld = this._backgroundSprite.depth + 5;
      this._backgroundSpriteOld = this._backgroundSprite;
      this._backgroundSpriteOld.setDepth(depthOld);
      // create new background below it
      const configDefault = {
        scale: 2.0,
        speed: 2200,
        repeats: -1,
        yoyo: true,
      };
      const newConfig = { ...configDefault, ...config };

      ({
        background: this._backgroundSprite,
        pulseTween: this._backgroundPulseTween,
      } = createBackgroundImagePulsing(this.scene, data, newConfig));

      this._backgroundSprite.setDepth(index * 10);
      this._backgroundSprite.setAlpha(1);
      // fade out the old background
      this._backgroundFadeOutTween = this.scene.tweens.add({
        targets: this._backgroundSpriteOld, // the image to animate
        alpha: { from: 1, to: 0 },
        ease: 'Cubic.EaseOut',
        duration: 1000,
        yoyo: false,
        repeat: 0, // no repeat
        onComplete: () => {
          if (this._backgroundFadeOutTween) {
            this._backgroundFadeOutTween.remove();
            this._backgroundFadeOutTween = undefined;
            this._backgroundSpriteOld?.destroy();
          }
        },
      });
      this._backgroundFadeInTween = this.scene.tweens.add({
        targets: this._backgroundSprite, // the image to animate
        alpha: { from: 0, to: 1 },
        ease: 'Cubic.EaseOut',
        duration: 1000,
        yoyo: false,
        repeat: 0, // no repeat
        onComplete: () => {
          if (this._backgroundFadeInTween) {
            this._backgroundFadeInTween.remove();
            this._backgroundFadeInTween = undefined;
          }
        },
      });
    } else {
      const configDefault = {
        scale: 2.0,
        speed: 2200,
        repeats: -1,
        yoyo: true,
      };
      const newConfig = { ...configDefault, ...config };
      ({
        background: this._backgroundSprite,
        pulseTween: this._backgroundPulseTween,
      } = createBackgroundImagePulsing(this.scene, data, newConfig));

      this._backgroundSprite.setDepth(index * 10);
    }
  }

  renderBackgroundAnimate(data: string, config: object, index: number) {
    if (data == null) {
      this._backgroundFadeOutTween?.stop();
      this._backgroundFadeInTween?.stop();
      this._backgroundSpriteOld?.destroy();
      this._backgroundSprite?.destroy();
      return;
    }
    if (this._backgroundPulseTween) {
      this._backgroundPulseTween.stop();
      this._backgroundPulseTween.remove();
    }
    if (this._backgroundSprite) {
      // if already fading (a past background change not finalized yet)
      if (this._backgroundFadeOutTween) {
        // stop transition finalize old transition first
        this._backgroundSpriteOld?.destroy();
        // Note: just stop it. onStop will call onComplete!
        this._backgroundFadeOutTween.stop();
      }
      if (this._backgroundFadeInTween) {
        // Note: just stop it. onStop will call onComplete!
        this._backgroundFadeInTween.stop();
      }
      // lift up old background
      const depthOld = this._backgroundSprite.depth + 5;
      this._backgroundSpriteOld = this._backgroundSprite;
      this._backgroundSpriteOld.setDepth(depthOld);
      // create new background below it
      const strings: string[] = [];
      const configDefault = {
        frames: strings,
        repeats: -1,
        frameRate: 8,
        yoyo: false,
      };
      const newConfig = { ...configDefault, ...config };
      ({
        background: this._backgroundSprite,
        animation: this._backgroundAnimation,
      } = createBackgroundAnimation(this.scene, 'main', newConfig));

      this._backgroundSprite.setDepth(index * 10);
      this._backgroundSprite.setAlpha(1);
      // fade out the old background
      this._backgroundFadeOutTween = this.scene.tweens.add({
        targets: this._backgroundSpriteOld, // the image to animate
        alpha: { from: 1, to: 0 },
        ease: 'Cubic.EaseOut',
        duration: 1000,
        yoyo: false,
        repeat: 0, // no repeat
        onComplete: () => {
          if (this._backgroundFadeOutTween) {
            this._backgroundFadeOutTween.remove();
            this._backgroundFadeOutTween = undefined;
            this._backgroundSpriteOld?.destroy();
          }
        },
      });
      this._backgroundFadeInTween = this.scene.tweens.add({
        targets: this._backgroundSpriteOld, // the image to animate
        alpha: { from: 0, to: 1 },
        ease: 'Cubic.EaseOut',
        duration: 1000,
        yoyo: false,
        repeat: 0, // no repeat
        onComplete: () => {
          if (this._backgroundFadeInTween) {
            this._backgroundFadeInTween.remove();
            this._backgroundFadeInTween = undefined;
          }
        },
      });
    } else {
      const strings: string[] = [];
      const configDefault = {
        frames: strings,
        repeats: -1,
        frameRate: 8,
        yoyo: false,
      };
      const newConfig = { ...configDefault, ...config };
      ({
        background: this._backgroundSprite,
        animation: this._backgroundAnimation,
      } = createBackgroundAnimation(this.scene, 'main', newConfig));

      this._backgroundSprite.setDepth(index * 10);
    }
  }

  public Cleanup() {
    this._backgroundFadeOutTween?.remove();
    this._backgroundFadeInTween?.remove();
    this._backgroundSpriteOld?.destroy();
    this._backgroundSprite?.destroy();
    this._backgroundPulseTween?.remove();
  }
}
export { BackgroundRenderer };
