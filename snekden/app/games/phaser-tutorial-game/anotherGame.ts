import Phaser from "phaser";

function collectStar(
  player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  star: Phaser.Types.Physics.Arcade.GameObjectWithBody,
): void {
  star.disableInteractive();
  // star.destroy();
  score += 10;
  scoreText.setText("Score: " + score);
  if (stars.countActive(true) === 0) {
    stars.children.iterate((child) => {
      child.setInteractive();
      // child.emit(true, child.getIndexList, 0, true, true);
      // child.enableBody(true, child.getIndexList, 0, true, true);
    });
  }

  // const x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  // const bomb = bombs.create(x, 16, 'bomb');
  // bomb.setBounce(1);
  // bomb.setCollideWorldBounds(true);
  // bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
}

// function hitBomb(
//   player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
//   bombs: Phaser.Types.Physics.Arcade.GameObjectWithBody,
// ): void {
//   this.physics.pause;
//   player.
// }

export const starConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

function update(this: Phaser.Scene) {
  if (gameOver) {
    return;
  }
  cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown) {
    console.log("button down");
    player.setVelocityX(-160);

    player.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.play("right", true);
  } else {
    player.setVelocityX(0);

    player.play("turn", true);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}

function preload(this: Phaser.Scene) {
  this.load.image("sky", "assets/sky.png");
  this.load.image("ground", "assets/platform.png");
  this.load.image("star", "assets/star.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

let platforms: Phaser.Physics.Arcade.StaticGroup;
let player: Phaser.Physics.Arcade.Sprite;

let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
let stars: Phaser.Physics.Arcade.Group;

let bombs: Phaser.Physics.Arcade.Group;

let score = 0;
let scoreText: Phaser.GameObjects.Text;
let gameOver: boolean = false;

function create(this: Phaser.Scene) {
  this.add.image(400, 300, "sky");
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, "ground").setScale(2).refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  scoreText = this.add.text(16, 16, "score:0", {
    fontSize: "32px",
    color: "#000",
  });

  player = this.physics.add.sprite(100, 450, "dude");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("dude", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  this.physics.add.collider(player, platforms);
  stars = this.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });
  stars.children.iterate((child: Phaser.GameObjects.GameObject) => {
    child.body.velocity.y = Phaser.Math.FloatBetween(0.4, 0.8);
    // child.setBounceY = (Phaser.Math.FloatBetween(0.4, 0.8));
  });

  this.physics.add.collider(stars, platforms);
  this.physics.add.overlap(player, stars, collectStar, undefined, this);

  bombs = this.physics.add.group();
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(
    player,
    bombs,
    (player2: Phaser.Types.Physics.Arcade.GameObjectWithBody, bomb) => {
      this.physics.pause();
      player.play("turn", true);
      gameOver = true;
    },
    undefined,
    this,
  );
}
