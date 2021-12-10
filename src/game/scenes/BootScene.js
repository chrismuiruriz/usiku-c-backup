import { Scene } from "phaser";
import Server from "../services/Server";

import paper from "../../assets/img/paper.png";
import thudMp3 from "../../assets/media/thud.mp3";
import thudOgg from "../../assets/media/thud.ogg";

import gameBg from "../../assets/img/game-play/game-bg.png";
import pipes from "../../assets/img/game-play/pipes.png";

import menuButton from "../../assets/img/game-play/menu-button.png";
import stars from "../../assets/img/game-play/stars-25.png";
import starsBg from "../../assets/img/game-play/stars-bg.png";
import bigProgressBar from "../../assets/img/game-play/big-progress-bar-21x340.png";
import brownBarTitle from "../../assets/img/game-play/brown-bar-title.png";
import cleanPolluteIcon from "../../assets/img/game-play/icon.png";
import clockBg from "../../assets/img/game-play/icon.png";

import factoryStation from "../../assets/img/game-play/factory-station.png";
import redTriangleButton from "../../assets/img/game-play/red-triangle-button.png";
import greenTriangleButton from "../../assets/img/game-play/green-triangle-button.png";
import blueTriangleButton from "../../assets/img/game-play/blue-triangle-button.png";

import dock from "../../assets/img/game-play/dock-2.png";
import boat from "../../assets/img/game-play/boat-5.png";

import labStation from "../../assets/img/game-play/lab-station.png";
import labStationRightButton from "../../assets/img/game-play/lab-station-right-button.png";
import labStationUpButton from "../../assets/img/game-play/lab-station-up-button.png";
import labStationDownButton from "../../assets/img/game-play/lab-station-down-button.png";
import labStationPuzzleIcons from "../../assets/img/game-play/lab-station-puzzle-icons-38x42.png";
import labStationPebbles from "../../assets/img/game-play/pebbles.png";
import labStationGrid from "../../assets/img/game-play/grid.png";

import excavatorBase from "../../assets/img/game-play/excavator-base.png";
import excavatorArm from "../../assets/img/game-play/excavator-arm.png";
import truck from "../../assets/img/game-play/truck-empty.png";

import farmCleanIcon from "../../assets/img/game-play/farm-clean-icon.png";
import farmPollutingIcon from "../../assets/img/game-play/farm-polluting-icon.png";
import farmCleanText from "../../assets/img/game-play/farm-clean-text.png";
import farmPollutingText from "../../assets/img/game-play/farm-polluting-text.png";

import loadingSceneBg from "../../assets/img/loading/loading-bg.png";
import gameLogo from "../../assets/img/common/game-logo.png";
import kicdLogo from "../../assets/img/common/kicd-logo.png";
import navigationButton from "../../assets/img/common/navigation-73x73.png";

import startSceneBg from "../../assets/img/start/start-bg.png";
import storySceneBg from "../../assets/img/story/story-bg.png";
import startSceneCharacters from "../../assets/img/start/characters.png";

import startBtn from "../../assets/img/common/start-btn-241x129.png";
import continueBtn from "../../assets/img/common/continue-btn-283x169.png";
import okBtn from "../../assets/img/common/ok-btn-146x154.png";

import storyCharacterKids from "../../assets/img/story/characters/char-happy.png";
import storyCharacterElder from "../../assets/img/story/characters/elder-smile.png";

import greenBackground from "../../assets/img/common/green-bg.png";

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
    this.load.image("clean-pollute-icon", cleanPolluteIcon);
    this.load.image("clock-bg", clockBg);
    this.load.spritesheet("stars", stars, { frameWidth: 25, frameHeight: 25 });
    this.load.image("stars-bg", starsBg);
    this.load.spritesheet("big-progress-bar", bigProgressBar, {
      frameWidth: 21,
      frameHeight: 340,
    });
    this.load.image("brown-bar-title", brownBarTitle);

    this.load.image("factory-station", factoryStation);
    this.load.image("red-triangle-button", redTriangleButton);
    this.load.image("green-triangle-button", greenTriangleButton);
    this.load.image("blue-triangle-button", blueTriangleButton);
    this.load.image("dock", dock);
    this.load.image("boat", boat);

    this.load.image("lab-station", labStation);
    this.load.image("lab-station-right-button", labStationRightButton);
    this.load.image("lab-station-up-button", labStationUpButton);
    this.load.image("lab-station-down-button", labStationDownButton);
    this.load.image("gridup", labStationGrid);
    this.load.spritesheet("lab-station-puzzle-icons", labStationPuzzleIcons, {
      frameWidth: 38,
      frameHeight: 41,
    });
    this.load.spritesheet("lab-station-pebbles", labStationPebbles, {
      frameWidth: 38,
      frameHeight: 38,
    });
    this.load.spritesheet("navigation-btn", navigationButton, {
      frameWidth: 73,
      frameHeight: 73,
    });

    this.load.image("excavator-base", excavatorBase);
    this.load.image("excavator-arm", excavatorArm);
    this.load.image("truck", truck);

    this.load.image("farm-clean-icon", farmCleanIcon);
    this.load.image("farm-polluting-icon", farmPollutingIcon);
    this.load.image("farm-clean-text", farmCleanText);
    this.load.image("farm-polluting-text", farmPollutingText);

    this.load.image("loading-scene-bg", loadingSceneBg);
    this.load.image("start-scene-bg", startSceneBg);
    this.load.image("story-scene-bg", storySceneBg);
    this.load.image("start-scene-characters", startSceneCharacters);
    this.load.image("green-bg", greenBackground);

    this.load.image("story-kids", storyCharacterKids);
    this.load.image("story-elder", storyCharacterElder);

    this.load.image("game-logo", gameLogo);
    this.load.image("kicd-logo", kicdLogo);
    this.load.spritesheet("start-btn", startBtn, {
      frameWidth: 241,
      frameHeight: 129,
    });
    this.load.spritesheet("continue-btn", continueBtn, {
      frameWidth: 283,
      frameHeight: 169,
    });
    this.load.spritesheet("ok-btn", okBtn, {
      frameWidth: 146,
      frameHeight: 154,
    });
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
    this.scene.start("GameSetupScene", {
      server: this.server,
      onGameOver: this.handleGameOver,
    });
  }
}
