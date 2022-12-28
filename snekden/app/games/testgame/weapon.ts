export default class MeleeWeapon extends Phaser.Physics.Arcade.Sprite {
  damage: number;
  isAttacking: boolean = false;
  // attackAnimation: Phaser.GameObjects.GameObject = null;
  constructor(scene, x, y) {

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNames('meleeWeapon', { prefix: 'meleeWeapon-attack-', start: 1, end: 4 }),
      frameRate: 10,
      repeat: 0
    });

    this.damage = 1;

  }

  setUp() {
    this.body.enable = false;
    this.isAttacking = false;
  }

  attack() {
    if (!this.isAttacking) {
      this.isAttacking = true;
      this.body.enable = true;
      this.attackAnimation = this.anims.play('attack', false);
      this.attackAnimation.on('animationcomplete', () => {
        this.body.enable = false;
        this.isAttacking = false;
      });

    }
  }
}