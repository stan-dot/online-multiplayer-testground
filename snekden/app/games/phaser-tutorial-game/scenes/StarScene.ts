import Phaser from "phaser";

import { Scene } from "phaser";

export default class StarScene extends Scene {
  platforms: Phaser.Physics.Arcade.StaticGroup;
  player: Phaser.Physics.Arcade.Sprite;
  stars: Phaser.Physics.Arcade.Group;
  bombs: Phaser.Physics.Arcade.Group;
  scoreText: Phaser.GameObjects.Text;
  gameOver: boolean;
  score: number;

  constructor() {
    super("starscene");
    this.platforms = this.physics.add.staticGroup();
    this.player = this.physics.add.sprite(100, 450, "dude");
    this.stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });
    this.scoreText = this.add.text(16, 16, "score:0", {
      fontSize: "32px",
      color: "#000",
    });
    this.bombs = this.physics.add.group({
      key: "bomb",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    });
    this.gameOver = false;
    this.score = 0;
  }

  collectStar(
    player: Phaser.Types.Physics.Arcade.GameObjectWithBody,
    star: Phaser.Types.Physics.Arcade.GameObjectWithBody,
  ): void {
    star.disableInteractive();
    star.destroy();
    this.score += 10;
    this.scoreText.setText("Score: " + this.score);
    if (this.stars.countActive(true) === 0) {
      this.stars.children.iterate((child) => {
        child.setInteractive();
        child.emit("soemthing", child.getIndexList, 0, true, true);
        // child.enableBody(true, child.getIndexList, 0, true, true);
      });
    }

    const x: number = player.body.position.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);
    const bomb = this.bombs.create(x, 16, "bomb");
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }

  hitBomb() {
    this.physics.pause;
    // this.player.body.position
  }

  update() {
    console.log("updating");
    if (this.gameOver) {
      return;
    }
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      console.log("button down");
      this.player.setVelocityX(-160);

      this.player.play("left", true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);

      this.player.play("right", true);
    } else {
      this.player.setVelocityX(0);

      this.player.play("turn", true);
    }

    if (cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  create() {
    this.add.image(400, 300, "sky");
    this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
    this.platforms.create(600, 400, "ground");
    this.platforms.create(50, 250, "ground");
    this.platforms.create(750, 220, "ground");

    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
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

    this.physics.add.collider(this.player, this.platforms);
    this.stars.children.iterate((child: Phaser.GameObjects.GameObject) => {
      child.body.velocity.y = Phaser.Math.FloatBetween(0.4, 0.8);
      // child.setBounceY = (Phaser.Math.FloatBetween(0.4, 0.8));
    });

    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar
    );

    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider( this.player, this.bombs);
  }
}
