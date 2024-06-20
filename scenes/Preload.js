export default class Preload extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Preload");
  }

  init() {
    // this is called before the scene is created
    // init variables
    // take data passed from other scenes
    // data object param {}
  }

  preload() {
    this.load.image("Gilberto", "../public/assets/yo.jpeg");
    this.load.image("Escenario", "../public/assets/escenario.png");
    this.load.image("Mira", "../public/assets/mira.png");
    this.load.image("Tile", "../public/assets/tile.png");
    this.load.image("tomate", "./public/assets/tomate.png");
    this.load.image("zapato", "./public/assets/zapato.png");
    this.load.image("botella", "./public/assets/botella.png")
    
  }

  create() {
    // create game objects
   this.scene.start("Game")
  }

  update() {
    // update game objects
  }
}
