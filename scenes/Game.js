export default class Game extends Phaser.Scene {
  constructor() {
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
    this.baseSpeed = 500; // Velocidad base
    this.speedIncrease = 10; // Incremento de velocidad por segundo
    
  }
  

  create() {
    // creacion de escenario
    this.centerX = this.game.config.width / 2;
    this.centerY = this.game.config.height / 2;
    this.background = this.add.image(this.centerX, this.centerY, "Escenario");
   
    this.addSounds()

    // creacion del tile
    this.tile = this.add.image(this.centerX,980, "Tile")
     
    //creacion de personaje
    this.personaje = this.physics.add.sprite(this.centerX, 650, "Gilberto");
    this.personaje.setScale(0.5);
    this.personaje.setCollideWorldBounds(true);
   
    //globo de texto
    this.globoTexto = this.add.image(this.personaje.x + 300, this.personaje.y-250, "globo")

    this.dialoge= [
    "¿Qué hace un perro con un taladro? Taladrando",
    "¿Cuál es el país que ríe y explota?Ja-pon",
    "¿Ustedes saben que viene después  de USA? USB",
    "¿Saben la diferencia entre un volcán  y un terremoto?    Que el el terremoto ensucia y el volcán lava",
    "¿Qué hace una abeja en el gimnasio?¡Zum-ba!",
    "Niki nikol si o no?"
    ]
    //se agregan chistes  
    const chiste = Phaser.Math.RND.pick(this.dialoge);
    this.Text = this.add.text(this.personaje.x + 120, this.personaje.y-320, ` ${chiste} `,{
      fontSize: "25px Arial",
      fill: "#000",
      wordWrap: { width: this.globoTexto.width }
    })

    this.HandlerTimer()
        

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
  
   

    this.time.addEvent({
      delay: 900,
      callback: this.OnSecond,
      callbackScope: this,
      loop: true,
    })

    //reconocimiento del movimiento de mouse
   this.pointer = this.input.activePointer;
   this.events.on('shutdown', this.shutdown, this);

  }
  
  HandlerTimer(){
   this.time.addEvent({
      delay: 4000, // Mostrar el globo de texto durante 2 segundos al inicio
      callback: () => {
        // Configurar el temporizador para alternar la visibilidad del globo de texto
        this.time.addEvent({
          delay: 3000, // Cada 2 segundos
          callback: this.toggleSpeechBubble,
          callbackScope: this,
          loop: true
        });
      },
            callbackScope: this
        });
  }

  toggleSpeechBubble() {
   if (this.globoTexto.visible) {
      // Ocultar el globo de texto y el texto
      this.globoTexto.setVisible(false);
      this.Text.setVisible(false);
    } else {
      // Mostrar el globo de texto y el texto
      const randomDialogue = Phaser.Math.RND.pick(this.dialoge);
      this.Text.setText(randomDialogue);
      this.globoTexto.setVisible(true);
      this.Text.setVisible(true);
    }
  }

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
     // Establecer datos adicionales
    recolectable.setData("tipo", tipo);
    recolectable.setData("points", this.shapes[tipo].points);
    recolectable.setData("baseSpeed", this.baseSpeed);
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

      const points= recolectable.getData("points");
      
      this.shapes [nombreFig].count += 1;
      
      console.table(this.shapes);
      
      console.log("score", this.score);
     
      this.textScore.setText(
      ` ${this.score}`)
       
      recolectable.destroy()
    }  
 }
  
  addSounds(){
    this.backgroundMusic = this.sound.add("gameplay",{
      volume: 0.5,
      loop: true
    });
    this.backgroundMusic.play();
  }
  shutdown(){
    if(this.backgroundMusic){
      this.backgroundMusic.stop()
      console.log("se detiene la musica")
  }
 }
  
  update(time, deltatime) {
    //se mueve la mira con el mouse
    this.mira.x = this.pointer.x;
    this.mira.y = this.pointer.y;
    
    if(this.a.isDown){
      this.personaje.setVelocityX(-260)
    } else if (this.d.isDown){
      this.personaje.setVelocityX(260)
    } else this.personaje.setVelocityX(0);
   
    if ( this.gameOver ) {
      this.scene.pause();  
      return;
    }
    
    if(this.r.isDown && this.gameOver ) {
      console.log("reincia")
      this.scene.restart();
    
    }
    let deltaInSeconds = deltatime / 1000;
     this.timer += deltaInSeconds;

    this.recolectables.children.iterate((recolectable) => {
      const baseSpeed = recolectable.getData("baseSpeed");
      const newSpeed = baseSpeed + this.speedIncrease * this.timer;
      const direction = recolectable.body.velocity.x > 0 ? 1 : -1;
      recolectable.setVelocityX(newSpeed * direction);
      delay:500;
    });

   this.globoTexto.setPosition(this.personaje.x + 300, this.personaje.y-250,);
   this.Text.setPosition(this.personaje.x + 120, this.personaje.y-320,);
  }
  
}
