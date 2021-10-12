import { Scene } from "phaser";
import Server from "../services/Server";

import paper from "../../assets/img/paper.png";
import thudMp3 from "../../assets/media/thud.mp3";
import thudOgg from "../../assets/media/thud.ogg";

export default class BootScene extends Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    this.load.image("paper", paper);
    this.load.audio("thud", [thudMp3, thudOgg]);
  }

  init() {
    this.server = new Server();
  }

  create() {
    this.createNewGame();
  }

  handleGameOver = (data) => {
    this.server.leave();
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
