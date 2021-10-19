import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import PlayScene from "./scenes/PlayScene";
import GameOverScene from "./scenes/GameOverScene";

export default {
  width: 320,
  height: 480,
  backgroundColor: "#F6F8F7",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  type: Phaser.AUTO,
  scene: [BootScene, PlayScene, GameOverScene],
};
