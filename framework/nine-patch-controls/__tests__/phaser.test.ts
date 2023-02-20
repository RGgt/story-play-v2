// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, it, expect } from 'vitest';
// eslint-disable-next-line import/no-extraneous-dependencies
import jsdom from 'jsdom';
import Phaser from 'phaser';
import { createButton } from '../src/components/Button/main';

// @vitest-environment jsdom
describe('Real tests', () => {
  const { JSDOM } = jsdom;
  const document = new JSDOM(
    '<!DOCTYPE html><html><body><div id="game-container"></div></body></html>',
    {
      pretendToBeVisual: true,
      resources: 'usable',
      runScripts: 'dangerously',
      url: 'http://localhost',
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      // renderType: 'html', // add this line
      storageQuota: 10000000,
      // renderingMode: 'cpu',
    }
  );
  global.window = document.window;
  global.document = document.window._document;
  global.Image = global.window.Image;
  global.HTMLCanvasElement = window.HTMLCanvasElement;
  global.requestAnimationFrame = window.requestAnimationFrame;

  Object.keys(document.window).forEach((property) => {
    if (typeof global[property] === 'undefined') {
      global[property] = document.window[property];
    }
  });

  global.navigator = global.window.navigator;

  it('Phaser initialization test', () => {
    const myCanvas = document.window._document.createElement('canvas');
    const myContext: CanvasRenderingContext2D =
      myCanvas.getContext('2d').constructor!;

    const game: Phaser.Game = new Phaser.Game({
      type: Phaser.CANVAS,
      canvas: myCanvas,
      context: myContext,
      // parent: 'game-container',
      width: 800,
      height: 600,
      scale: {
        width: 1920,
        height: 1080,
        mode: Phaser.Scale.NONE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: {
        create: () => {
          // button = new Button(this, 0, 0, 'buttonTexture');
          const graphics = this.game.add.graphics();
          graphics.fillStyle(0xff0000, 1);
          graphics.fillRect(100, 200, 300, 400);

          const c = createButton(this, {
            x: 200,
            y: 200,
            width: 500,
            height: 200,
          });
          this.add.existing = function () {};
          c.button.init = function () {};
          expect(this.add.existing).toHaveBeenCalledOnce();
          expect(this.add.existing).toHaveBeenCalledWith(c.button);
        },
      },
    });
    expect(2 + 5).toBe(7);
    game.destroy(true);
  });

  // it('simple valid equation', () => {
  //   expect(Math.sqrt(4)).toBe(2);
  //   expect(2 + 5).toBe(7);
  //   expect(3 * 5).toBe(15);
  //   expect(24 / 6).toBe(4);
  // });
});
