import Phaser from "phaser";
import BootScene from "./scenes/BootScene";
import LoadingScene from "./scenes/LoadingScene";
import StartScene from "./scenes/StartScene";
import StoryScene from "./scenes/StoryScene";
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
  input: {
    activePointers: 3,
  },
  backgroundColor: 0x333333,
  scene: [
    BootScene,
    LoadingScene,
    StartScene,
    StoryScene,
    PlayScene,
    GameOverScene,
  ],
};
