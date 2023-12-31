import { Scene } from "phaser";

import paper from "../../assets/img/paper.png";
import thudMp3 from "../../assets/media/thud.mp3";
import thudOgg from "../../assets/media/thud.ogg";
import s_buttonClick from "../../assets/media/usafi-mtoni-button-2.mp3";

import s_correctAns from "../../assets/media/correct-answer.mp3";
import s_wrongAns from "../../assets/media/wrong-answer.mp3";
import s_starCollected from "../../assets/media/star-collected.mp3";

import s_correctSort from "../../assets/media/correct-sort.mp3";
import s_wrongSort from "../../assets/media/wrong-sort.mp3";
import s_correctMatch from "../../assets/media/correct-match.mp3";

import s_trashPicked from "../../assets/media/excavator-collect.mp3";
import s_excavatorMove from "../../assets/media/excavator-tap.mp3";

import s_riverFlow from "../../assets/media/river-flow.mp3";
import s_newQuestion from "../../assets/media/new-question.mp3";
import s_materialArrives from "../../assets/media/material-arrives.mp3";

import star from "../../assets/img/game-play/star.png";
import gameBg from "../../assets/img/game-play/game-bg.png";
import howToPlayGuide from "../../assets/img/how-to-play/how-to-play-guide.png";
import gamePlayGuide from "../../assets/img/game-play/game-play-guide.png";
import pipes from "../../assets/img/game-play/pipes.png";

import menuButton from "../../assets/img/game-play/menu-button.png";
import stars from "../../assets/img/game-play/stars-25.png";
import starsBg from "../../assets/img/game-play/stars-bg.png";
import bigProgressBar from "../../assets/img/game-play/big-progress-bar-21x340.png";
import brownBarTitle from "../../assets/img/game-play/brown-bar-title.png";
import cleanPolluteIcon from "../../assets/img/game-play/icon.png";
import clockBg from "../../assets/img/game-play/icon.png";
import fullscreenButton from "../../assets/img/common/fullscreen.png";

import factoryStation from "../../assets/img/game-play/factory-station.png";
import redTriangleButton from "../../assets/img/game-play/red-triangle-button.png";
import greenTriangleButton from "../../assets/img/game-play/green-triangle-button.png";
import blueTriangleButton from "../../assets/img/game-play/blue-triangle-button.png";

import dock from "../../assets/img/game-play/dock-2.png";
import boat from "../../assets/img/game-play/boat-5.png";
import bottle from "../../assets/img/game-play/bottle.png";

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
import trucks from "../../assets/img/game-play/trucks-59x37.png";

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
import letsGoBtn from "../../assets/img/story/letsgo-241x129.png";
import nextBtn from "../../assets/img/story/next-241x129.png";
import continueBtn from "../../assets/img/common/continue-btn-283x169.png";
import okBtn from "../../assets/img/common/ok-btn-146x154.png";

import storyCharacterKids from "../../assets/img/story/characters/char-happy.png";
import storyCharacterElder from "../../assets/img/story/characters/elder-smile.png";

import greenBackground from "../../assets/img/common/green-bg.png";

//fonts
import alloyinkPNG from "../../assets/fonts/alloyink-nrlyo/bitmap.png";
import alloyinkXML from "../../assets/fonts/alloyink-nrlyo/bitmap.xml";

import naturalLogPNG from "../../assets/fonts/natural-log/bitmap.png";
import naturalLogXML from "../../assets/fonts/natural-log/bitmap.xml";

import segmentsBasicPNG from "../../assets/fonts/16segments-basic/bitmap.png";
import segmentsBasicXML from "../../assets/fonts/16segments-basic/bitmap.xml";

import matatu from "../../assets/img/game-play/matatu.png";
import chatTimeBubble from "../../assets/img/chat-time/bubble-420x187.png";

import dropIcons from "../../assets/img/game-play/drop-icons-135x135.png";

// Intro story audio
import introChat1Audio from "../../assets/img/story/audio/1-david.mp3";
import introChat2Audio from "../../assets/img/story/audio/2-kezia.mp3";
import introChat3Audio from "../../assets/img/story/audio/3-elder.mp3";
import introChat4Audio from "../../assets/img/story/audio/4-elder.mp3";
import introChat5Audio from "../../assets/img/story/audio/5-elder.mp3";
import introChat6Audio from "../../assets/img/story/audio/6-elder.mp3";
import introChat7Audio from "../../assets/img/story/audio/7-elder.mp3";
import introChat8Audio from "../../assets/img/story/audio/8-kids.mp3";
import introChat9Audio from "../../assets/img/story/audio/9-david.mp3";

// Outro audio
import outroChat1Audio from "../../assets/img/end/audio/elder.mp3";
import outroChat2Audio from "../../assets/img/end/audio/david.mp3";
import outroChat3Audio from "../../assets/img/end/audio/kezia.mp3";

export default class BootScene extends Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    this.load.image("paper", paper);
    this.load.audio("thud", [thudMp3, thudOgg]);
    this.load.audio("s-button-click", s_buttonClick);

    this.load.audio("s-correct-answer", s_correctAns);
    this.load.audio("s-wrong-answer", s_wrongAns);
    this.load.audio("s-start-collected", s_starCollected);

    this.load.audio("s-correct-sort", s_correctSort);
    this.load.audio("s-wrong-sort", s_wrongSort);
    this.load.audio("s-trash-picked", s_trashPicked);
    this.load.audio("s-excavator-move", s_excavatorMove);
    this.load.audio("s-river-flow", s_riverFlow);
    this.load.audio("s-new-question", s_newQuestion);
    this.load.audio("s-material-arrives", s_materialArrives);
    this.load.audio("s-correct-match", s_correctMatch);

    this.load.image("bottle", bottle);

    this.load.image("star", star);
    this.load.image("game-backround", gameBg);
    this.load.image("how-to-play-guide", howToPlayGuide);
    this.load.image("game-play-guide", gamePlayGuide);

    this.load.image("pipes", pipes);
    this.load.image("menu-button", menuButton);
    this.load.image("fullscreen-button", fullscreenButton);
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
    this.load.spritesheet("trucks", trucks, {
      frameWidth: 59,
      frameHeight: 37,
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
    this.load.spritesheet("letsgo-btn", letsGoBtn, {
      frameWidth: 241,
      frameHeight: 129,
    });
    this.load.spritesheet("next-btn", nextBtn, {
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

    this.load.spritesheet("matatus", matatu, {
      frameWidth: 74,
      frameHeight: 38,
    });

    this.load.spritesheet("chat-time-bubble", chatTimeBubble, {
      frameWidth: 420,
      frameHeight: 187,
    });

    this.load.spritesheet("drop-icons", dropIcons, {
      frameWidth: 135,
      frameHeight: 135,
    });

    this.load.bitmapFont("alloyink", alloyinkPNG, alloyinkXML);
    this.load.bitmapFont("natural-log", naturalLogPNG, naturalLogXML);
    this.load.bitmapFont("segments-basic", segmentsBasicPNG, segmentsBasicXML);

    this.load.audio("introChat1Audio", introChat1Audio);
    this.load.audio("introChat2Audio", introChat2Audio);
    this.load.audio("introChat3Audio", introChat3Audio);
    this.load.audio("introChat4Audio", introChat4Audio);
    this.load.audio("introChat5Audio", introChat5Audio);
    this.load.audio("introChat6Audio", introChat6Audio);
    this.load.audio("introChat7Audio", introChat7Audio);
    this.load.audio("introChat8Audio", introChat8Audio);
    this.load.audio("introChat9Audio", introChat9Audio);

    this.load.audio("outroChat1Audio", outroChat1Audio);
    this.load.audio("outroChat2Audio", outroChat2Audio);
    this.load.audio("outroChat3Audio", outroChat3Audio);
  }

  init() {
    this.server = "Server...";
  }

  create() {
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.add.bitmapText(
      this.screenCenterX,
      this.screenCenterY,
      "alloyink",
      "LOADING...",
      24,
      Phaser.Display.Align.CENTER
    );

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
    this.scene.start("LoadingScene", {
      server: this.server,
      onGameOver: this.handleGameOver,
    });
  }
}
