import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import PlayScene from "./scenes/PlayScene";
import GameOverScene from "./scenes/GameOverScene";

export default {
  type: Phaser.AUTO,
  parent: "game-canvas",
  scale: {
    width: 1200,
    height: 750,
    parent: "game-canvas",
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: false,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  backgroundColor: 0x333333,
  scene: [BootScene, PlayScene, GameOverScene],
};
