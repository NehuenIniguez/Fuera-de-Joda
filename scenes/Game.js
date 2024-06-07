// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Game");
  }

  init() {
    this.gameOver = false;
    //this.timer = 30;
    this.score = 0;
    this.shapes = {
      tomate: {points: 30, count: 0},
      zapato: {points: 50, count: 0},
      botella: {points: 70, count: 0}
    }
    this.dialoge= {
      chiste_uno: {uno:"¿Qué hace un perro con un taladro?... Taladrando"},
      chiste_dos: {dos: "¿Cuál es el país que ríe y explota?... Ja-pon"},
      chiste_tres: {tres:"¿Ustedes saben que viene después de USA?... USB"},
      chiste_cuatro: {cuatro: "¿Saben la diferencia entre un volcán y un terremoto?... Que el el terremoto ensucia y el volcán lava"},
      chiste_cinco: {cinco: "¿Qué hace una abeja en el gimnasio? ¡Zum-ba!"}
    }
  }

  preload() {
    // load assets
  
  }

  create() {
    // creacion de escenario
   
    this.add.image(400, 300, "Escenario")

    //creacion de personaje

    this.personaje = this.physics.add.sprite(400, 300, "Gilberto");
    this.personaje.setScale(0.5);
    this.personaje.setCollideWorldBounds(true);

    this.mira = this.physics.add.sprite(400, 300, "Mira");

    // adicion de teclas para movimiento de personaje
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    //this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
  }

  update() {
    //reconocimiento del movimiento de mouse
    const pointer = this.input.activePointer;

    //se mueve el personaje con el mouse
    this.mira.x = pointer.x;
    this.mira.y = pointer.y;
    
    if(this.a.isDown){
      this.personaje.setVelocityX(-160)
    } else if (this.d.isDown){
      this.personaje.setVelocityX(160)
    } else this.personaje.setVelocityX(0);

  }
}
