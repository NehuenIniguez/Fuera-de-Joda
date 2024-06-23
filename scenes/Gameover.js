export default class Gameover extends Phaser.Scene {
  constructor() {
    super("Gameover");
  }
 init(data){
    this.score = data.score || 0;
    this.gameOver = data.gameOver
 }
 preload(){
  this.load.image("Fondo", "./public/assets/fondo1.png")
 }
 create(){  
  //this.backgroundMusic.stop()

  this.background = this.add.image(864,490,"Fondo"); 
    
    
  this.add.text(850, 300, "¡Las risas no faltaron! No?", {
    fontSize: "40px",
    color: "#ffffff",
  })

  .setOrigin(0.5);
        
  this.add.text(800, 350, `Score ${this.score}`,{
      fontSize:"40px"
      }
  );

  this.input.keyboard.on('keydown-R', () => {
      this.scene.start(`Pantalla1`);
      console.log('Presionaste R');
  });
 }

}