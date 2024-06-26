import Pantalla1 from "./scenes/Pantalla1.js";
import Preload from "./scenes/Preload.js";
import Game from "./scenes/Game.js";
import Gameover from "./scenes/Gameover.js";

const config = {
  type: Phaser.AUTO,
  width: 1729,
  height: 980,
  pixelArt: true,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1729,
      height: 980,
    },
  },
  physics: {
    default: "arcade",
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [Preload, Game, Pantalla1, Gameover],
};

window.game = new Phaser.Game(config);
