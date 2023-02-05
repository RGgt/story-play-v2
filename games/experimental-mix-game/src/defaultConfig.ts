import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser',
  backgroundColor: '#4488aa',
  scale: {
    width: 1920,
    height: 1080,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
