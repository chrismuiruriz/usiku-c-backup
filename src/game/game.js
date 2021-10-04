import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import PlayScene from "./scenes/PlayScene";

export default {
  width: 720,
  height: 1080,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  type: Phaser.AUTO,
  scene: [BootScene, PlayScene],
};
