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
    this.load.spritesheet("Gilberto","../public/assets/Gilberto.png",{
      frameWidth: 346,
      frameHeight: 500,
    });
    //this.load.image("Gilberto", "../public/assets/Nehue.pj.png");
    this.load.image("Escenario", "../public/assets/escenario.png");
    this.load.image("Mira", "../public/assets/mira.png");
    this.load.image("Tile", "../public/assets/tile.png");
    this.load.image("tomate", "./public/assets/tomate.png");
    this.load.image("zapato", "./public/assets/zapato.png");
    this.load.image("botella", "./public/assets/botella.png");
    this.load.audio("gameplay", "./public/assets/Pista2.wav");
    this.load.image("globo", "./public/assets/globoTexto.png")
    
  }

  create() {
    // create game objects
   this.addPlayerAnims();
   this.add.sprite(400, 300, "Gilberto").setInteractive()
   
   this.scene.start("Pantalla1")
  }
  addPlayerAnims()
  {
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("Gilberto", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
  update() {
    // update game objects
  }
}
