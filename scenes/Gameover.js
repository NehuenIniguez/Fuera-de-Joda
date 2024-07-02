export default class Gameover extends Phaser.Scene {
  constructor() {
    super("Gameover");
  }
  init(data) {
    this.score = data.score || 0;
    this.gameOver = data.gameOver;
  }
  preload() {
    this.load.image("Fin", "./public/assets/Fondo2.jpg");
    this.load.audio("derrota", "./public/assets/derrota.wav");
  }
  create() {
    //this.backgroundMusic.stop()

    this.background = this.add.image(864, 490, "Fin");
    this.background.displayWidth = this.game.config.width;
    this.background.displayHeight = this.game.config.height;

    this.GameOverAudio();

    this.add
      .text(850, 200, "¡Las risas no faltaron! ¿No?", {
        fontSize: "60px",
        color: "#ffffff",
      })

      .setOrigin(0.5);

    this.add.text(770, 250, `Puntaje: ${this.score}`, {
      fontSize: "60px",
      color: "#fff",
    });

    this.add.text(350, 450, "Presiona R para volver a jugar", {
      fontSize: "60px",
      color: "#fff",
    });
    this.input.keyboard.on("keydown-R", () => {
      this.scene.start(`Pantalla1`);
      console.log("Presionaste R");
    });

    this.events.on("shutdown", this.shutdown, this);
  }

  GameOverAudio() {
    this.derrotaAudio = this.sound.add("derrota", {
      volume: 0.5,
      loop: true,
    });
    this.derrotaAudio.play();
  }
  shutdown() {
    if (this.derrotaAudio) {
      this.derrotaAudio.stop();
      console.log("se detiene la musica");
    }
  }
}
