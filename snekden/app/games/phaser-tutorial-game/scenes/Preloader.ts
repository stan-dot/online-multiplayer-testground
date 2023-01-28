
import { Scene } from 'phaser';

const assetsPathRoot = "../public/assets";

export default class Preloader extends Scene{

  constructor() {
    super("preloader");
  }

  preload() {
    console.log("preloading");
    this.load.image("sky", `${assetsPathRoot}/sky.png`);
    this.load.image("ground", `${assetsPathRoot}/platform.png`);
    this.load.image("star", `${assetsPathRoot}/star.png`);
    this.load.image("bomb", `${assetsPathRoot}/bomb.png`);
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  // create() {
  //   this.scene.start("preloader");
  // }
}