export default class Pantalla1 extends Phaser.Scene {
  constructor() {
   
    super("Pantalla1");
  }
 init(){
    
 }
 preload(){
  this.load.image("Fondo", "./public/assets/fondo1.png");
  this.load.audio("inicio", "./public/assets/Pista(1).wav");
 }
 create(){  
  this.input.on("pointerdown", this.inicio, this);
 
  this.AddMusicMenu() 

  console.log(this.MusicMenu)
  this.centerX = this.game.config.width / 2;
  this.centerY = this.game.config.height / 2;
  
  this.MenuBackground = this.add.image(this.centerX, this.centerY,"Fondo")
  
  this.events.on('shutdown', this.shutdown, this);

  this.add.text(480, 700, "Haga click para jugar",{
        fontSize: "65px",
        fill: "#fff",
  })
 }
 AddMusicMenu(){
   this.MenuMusic = this.sound.add("inicio",{
        volume:0.5,
        loop: true,
    })
    this.MenuMusic.play()
 }
  shutdown(){
    if(this.MenuMusic){
      this.MenuMusic.stop()
      console.log("se detiene la musica")
  }
 }
  

 inicio(pointer){
    this.scene.start("Game")

 }
}