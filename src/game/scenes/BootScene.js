import { Scene } from "phaser";
import Server from "../services/Server";

import paper from "../../assets/img/paper.png";
import thudMp3 from "../../assets/media/thud.mp3";
import thudOgg from "../../assets/media/thud.ogg";

import gameBg from "../../assets/img/game-play/game-bg.png";
import excavatorBase from "../../assets/img/game-play/excavator-base.png";
import excavatorArm from "../../assets/img/game-play/excavator-arm.png";

export default class BootScene extends Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    this.load.image("game-backround", gameBg);

    this.load.image("paper", paper);
    this.load.audio("thud", [thudMp3, thudOgg]);

    this.load.image("excavator-base", excavatorBase);

    this.load.image("excavator-arm", excavatorArm);
  }

  init() {
    this.server = "Server...";
  }

  create() {
    this.createNewGame();
  }

  handleGameOver = (data) => {
    this.scene.stop("PlayScene");

    this.scene.launch("GameOverScene", {
      ...data,
      onRestart: this.handleRestart,
    });
  };

  handleRestart = () => {
    this.scene.stop("GameOverScene");
    this.createNewGame();
  };

  createNewGame() {
    this.scene.start("PlayScene", {
      server: this.server,
      onGameOver: this.handleGameOver,
    });
  }
}
