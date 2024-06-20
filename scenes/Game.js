// URL to explain PHASER scene: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scene/

export default class Game extends Phaser.Scene {
  constructor() {
    // key of the scene
    // the key will be used to start the scene by other scenes
    super("Game");
  }

  init() {
    this.gameOver = false;
    this.timer = 0;
    this.score = 0;
    this.shapes = {
      tomate: {points: 30, count: 0},
      zapato: {points: 50, count: 0},
      botella: {points: 70, count: 0}
    }
    
  }

  create() {
    // creacion de escenario
   
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;
    this.background = this.add.image(this.centerX, this.centerY, "Escenario");
   
    // creacion del tile
    this.tile = this.add.image(this.centerX,980, "Tile")
    
    //creacion de personaje

    this.personaje = this.physics.add.sprite(this.centerX, 650, "Gilberto");
    this.personaje.setScale(0.5);
    this.personaje.setCollideWorldBounds(true);

    this.mira = this.physics.add.sprite(400, 300, "Mira");

    //agregamos recolectables
    this.recolectables = this.physics.add.group();
    this.physics.add.collider(this.personaje,this.recolectables, this.loseCondition, null,this);
    this.physics.add.overlap(this.mira,this.recolectables, this.Recolect, null,this);

    // adicion de teclas para movimiento de personaje
    this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.r = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    

    //se agrega el score
   this.textScore = this.add
      .text(this.game.config.width - 10, 10, "0", {
        fontSize: "70px",
      fill: "#fff",
      })
    .setOrigin(1, 0);
  
    //evento de un segundo
   this.time.addEvent({
      delay: 1000,
      callback: this.HandlerTimer,
      callbackScope: this,
      loop: true,
  });
  
  const dialoge= [
      "¿Qué hace un perro con un taladro?... Taladrando",
      "¿Cuál es el país que ríe y explota?... Ja-pon",
      "¿Ustedes saben que viene después de USA?... USB",
      "¿Saben la diferencia entre un volcán y un terremoto?... Que el el terremoto ensucia y el volcán lava",
      "¿Qué hace una abeja en el gimnasio? ¡Zum-ba!",
      "CUCA caLVO"
    ]
  //se agrega timer en la esquina superior 
    const chiste = Phaser.Math.RND.pick(dialoge);
    this.timerText = this.add.text(10,10, ` ${chiste} `,{
      fontSize: "30px",
      fill: "#fff"
    })
  

    this.time.addEvent({
      delay: 1000,
      callback: this.OnSecond,
      callbackScope: this,
      loop: true,
    })

    //reconocimiento del movimiento de mouse
     this.pointer = this.input.activePointer;

  }
  
 // HandlerTimer(){
 //   const chiste = Phaser.Math.RND.pick(dialoge);
 //   //this.timer+=1;
 //   this.timerText.setText(`Aguante de ${chiste} segundos`);
 // }

  OnSecond(){
    const tipos= ["tomate", "botella", "zapato"];

    const tipo = Phaser.Math.RND.pick(tipos);

    const side = Phaser.Math.Between(0, 1) // 0 para la izquierda, 1 para la derecha
  
    let x = (side === 0) ? -10 : 1730; // Fuera de la pantalla a la izquierda o derecha

    let y = Phaser.Math.Between(50, 550); // Altura aleatoria en la pantalla

    let recolectable = this.recolectables.create(x,y,tipo);
    recolectable.setVelocityX((side === 0) ? 600 : -900); // Mover el objeto hacia el centro

    recolectable.setGravity(400)
   
    //this.recolectables.setVelocity(100,50)
  }
  loseCondition(_personaje,_recolectable){
   this.scene.start("Gameover", {
        score: this.score,
        gameOver: this.gameOver
      })
 
  }
  Recolect(_mira, recolectable){
    if (this.pointer.isDown){
      const nombreFig = recolectable.getData("tipo");
      const puntosFig = recolectable.getData("points");

      this.score += puntosFig;

      const points= recolectable.getData("points")
      
      this.shapes [nombreFig].count += 1;
      console.table(this.shapes);
      console.log("score", this.score);
    
      recolectable.destroy()
      this.textScore.setText(
      ` ${this.score}`)
    }
    

  }
  
  update(time, deltatime) {
    
    //se mueve la mira con el mouse
    this.mira.x = this.pointer.x;
    this.mira.y = this.pointer.y;
    
    if(this.a.isDown){
      this.personaje.setVelocityX(-160)
    } else if (this.d.isDown){
      this.personaje.setVelocityX(160)
    } else this.personaje.setVelocityX(0);
   
    if ( this.gameOver ) {
      this.scene.pause();  
      return;
    }
    
    if(this.r.isDown && this.gameOver ) {
      console.log("reincia")
      this.scene.restart();
    
    }
  }
  
}
