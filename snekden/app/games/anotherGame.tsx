

import Phaser from "phaser";

export const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create
  }
};


function preload(this: Phaser.Scene) {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude',
    'assets/dude.png',
    { frameWidth: 32, frameHeight: 48 }
  );
}

function create(this: Phaser.Scene) {
  this.add.image(400, 300, 'sky');

  const particles = this.add.particles('red');

  const emitter = particles.createEmitter({
    speed: 100,
    scale: { start: 1, end: 0 },
    blendMode: 'ADD'
  });

  const logo = this.physics.add.image(400, 100, 'logo');

  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
}
