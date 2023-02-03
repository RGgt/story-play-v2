import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'phaser',
  backgroundColor: '#4488aa',
  scale: {
    width: 192,
    height: 108,
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
