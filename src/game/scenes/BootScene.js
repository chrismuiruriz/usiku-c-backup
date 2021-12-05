import { Scene } from "phaser";
import Server from "../services/Server";

import paper from "../../assets/img/paper.png";
import thudMp3 from "../../assets/media/thud.mp3";
import thudOgg from "../../assets/media/thud.ogg";

import gameBg from "../../assets/img/game-play/game-bg.png";
import pipes from "../../assets/img/game-play/pipes.png";

import menuButton from "../../assets/img/game-play/menu-button.png";

import factoryStation from "../../assets/img/game-play/factory-station.png";
import redTriangleButton from "../../assets/img/game-play/red-triangle-button.png";
import greenTriangleButton from "../../assets/img/game-play/green-triangle-button.png";
import blueTriangleButton from "../../assets/img/game-play/blue-triangle-button.png";

import dock from "../../assets/img/game-play/dock-2.png";
import boat from "../../assets/img/game-play/boat-5.png";

import labStation from "../../assets/img/game-play/lab-station.png";

import excavatorBase from "../../assets/img/game-play/excavator-base.png";
import excavatorArm from "../../assets/img/game-play/excavator-arm.png";

import farmCleanIcon from "../../assets/img/game-play/farm-clean-icon.png";
import farmPollutingIcon from "../../assets/img/game-play/farm-polluting-icon.png";
import farmCleanText from "../../assets/img/game-play/farm-clean-text.png";
import farmPollutingText from "../../assets/img/game-play/farm-polluting-text.png";

export default class BootScene extends Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    this.load.image("paper", paper);
    this.load.audio("thud", [thudMp3, thudOgg]);

    this.load.image("game-backround", gameBg);
    this.load.image("pipes", pipes);
    this.load.image("menu-button", menuButton);

    this.load.image("factory-station", factoryStation);
    this.load.image("red-triangle-button", redTriangleButton);
    this.load.image("green-triangle-button", greenTriangleButton);
    this.load.image("blue-triangle-button", blueTriangleButton);
    this.load.image("dock", dock);
    this.load.image("boat", boat);

    this.load.image("lab-station", labStation);

    this.load.image("excavator-base", excavatorBase);
    this.load.image("excavator-arm", excavatorArm);

    this.load.image("farm-clean-icon", farmCleanIcon);
    this.load.image("farm-polluting-icon", farmPollutingIcon);
    this.load.image("farm-clean-text", farmCleanText);
    this.load.image("farm-polluting-text", farmPollutingText);
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
