import { Scene } from "phaser";

import rc_label from "../../assets/img/take-position/labels-168x49.png";
import rc_bg from "../../assets/img/common/game-bg-no-filter.png";

import rc_board from "../../assets/img/round-summary/board.png";

import rc_groupScoreText from "../../assets/img/round-summary/group-score.png";

import rc_chatBubbles from "../../assets/img/round-summary/chatbubbles-441x163.png";

import rc_starFrame from "../../assets/img/round-summary/star-frame.png";

import rc_stars from "../../assets/img/round-summary/stars-39x38.png";

import GameState from "../data/GameState";

export default class RoundCompleteScene extends Scene {
  constructor() {
    super({
      key: "RoundCompleteScene",
    });
  }

  preload() {
    this.load.image(`rc_bg`, rc_bg);
    this.load.spritesheet(`rc_label`, rc_label, {
      frameWidth: 168,
      frameHeight: 49,
    });

    this.load.image(`rc_board`, rc_board);
    this.load.image(`rc_group-score`, rc_groupScoreText);
    this.load.image(`rc_star-frame`, rc_starFrame);

    this.load.spritesheet("rc_chat-bubbles", rc_chatBubbles, {
      frameWidth: 441,
      frameHeight: 163,
    });

    this.load.spritesheet("rc_stars", rc_stars, {
      frameWidth: 39,
      frameHeight: 38,
    });
  }

  async create(data) {
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.chats = [];
    this.currentChat = 1;
    this.chatCounter = 0;

    this.selectionCounter = 0;
    this.selections = [];

    this.gameState = new GameState();
    this.currentRound = this.gameState.getCurrentRound();
    this.totalGroupScore = this.gameState.getRoundScores(this.currentRound);
    this.roundStarCount = this.gameState.getRoundStar(this.currentRound);

    this.add
      .image(this.screenCenterX, this.screenCenterY, "rc_bg")
      .setOrigin(0.5);

    this.createBoard(
      "rc_group-score",
      200,
      this.screenCenterY,
      this.totalGroupScore,
      this.roundStarCount,
      false,
      1
    );

    this.createBoard(
      "rc_group-score",
      this.screenWidth - 200,
      this.screenCenterY,
      this.totalGroupScore,
      this.roundStarCount,
      true,
      1
    );

    this.createChatBubbles(
      this.gameState.getPlayerRoundScore(1, this.currentRound),
      this.gameState.getPlayerRoundScore(2, this.currentRound),
      this.gameState.getPlayerRoundScore(3, this.currentRound),
      this.gameState.getPlayerRoundScore(4, this.currentRound)
    );

    this.createButtons();
  }

  createBoard(
    titleTexture,
    boardX,
    boardY,
    scoresText,
    starsCount,
    isRotated,
    scaleFactor
  ) {
    let board = this.add.sprite(0, 0, "rc_board").setScale(scaleFactor);
    board.x = boardX;
    board.y = boardY;

    let groupScore = this.add.image(0, 0, titleTexture).setScale(scaleFactor);
    groupScore.x = board.x;
    if (isRotated) {
      groupScore.setAngle(180);
      groupScore.y =
        board.y + (board.height * scaleFactor) / 2 + 28 * scaleFactor;
    } else {
      groupScore.y =
        board.y - (board.height * scaleFactor) / 2 - 15 * scaleFactor;
    }

    let starFrame = this.add.image(0, 0, "rc_star-frame").setScale(scaleFactor);
    starFrame.x = board.x;
    if (isRotated) {
      starFrame.setAngle(180);
      starFrame.y =
        board.y - (board.height * scaleFactor) / 2 - 15 * scaleFactor;
    } else {
      starFrame.y =
        board.y + (board.height * scaleFactor) / 2 + 28 * scaleFactor;
    }

    let scores = this.add.text(board.x, board.y, scoresText, {
      fill: "#FFEE43",
      font: "86px natlog",
      align: "center",
      wordWrap: { width: board.width - 30, useAdvancedWrap: true },
    });
    scores.setOrigin(0.5);
    scores.setScale(scaleFactor);
    if (isRotated) {
      scores.setAngle(180);
    }

    let stars = [];

    for (let i = 0; i < 3; i++) {
      let star = this.add
        .sprite(0, 0, "rc_stars")
        .setFrame(0)
        .setOrigin(0.5, 0.5)
        .setScale(scaleFactor);

      if (i === 0) {
        star.x = starFrame.x - star.width * 2 + 20 / scaleFactor;
      } else if (i === 1) {
        star.x = starFrame.x;
      } else {
        star.x = starFrame.x + star.width * 2 - 20 / scaleFactor;
      }

      star.y = starFrame.y;
      stars.push(star);
    }

    for (let i = 0; i < starsCount; i++) {
      stars[i].setFrame(1);
    }
  }

  createButtons() {
    this.topLeftButton = this.add
      .sprite(0, 0, "ok-btn")
      .setFrame(0)
      .setAngle(180)
      .setScale(0.8)
      .setOrigin(1, 1);
    this.topLeftButton.x = 0;
    this.topLeftButton.y = 0;
    this.topLeftButton.setInteractive();

    this.topLeftButton.on("pointerdown", (pointer) => {
      if (this.selections.includes("topLeft")) {
        this.selectionCounter--;
        this.selections.splice(this.selections.indexOf(1), 1);
        this.topLeftButton.setFrame(0);
      } else {
        this.selectionCounter++;
        this.selections.push("topLeft");
        this.topLeftButton.setFrame(1);
      }

      this.checkIfAllSelected();
    });

    this.labLabel = this.add.image(0, 0, "rc_label").setOrigin(0, 0);
    this.labLabel.x = this.topLeftButton.x + this.topLeftButton.width - 20;
    this.labLabel.y = this.topLeftButton.y + 8;
    this.labLabel.setFrame(3);

    /*********************/

    this.topRightButton = this.add
      .sprite(0, 0, "ok-btn")
      .setFrame(0)
      .setAngle(180)
      .setScale(0.8)
      .setOrigin(1, 1);
    this.topRightButton.x = this.screenWidth - this.topRightButton.width + 30;
    this.topRightButton.y = 0;
    this.topRightButton.setInteractive();

    this.topRightButton.on("pointerdown", (pointer) => {
      if (this.selections.includes("topRight")) {
        this.selectionCounter--;
        this.selections.splice(this.selections.indexOf(1), 1);
        this.topRightButton.setFrame(0);
      } else {
        this.selectionCounter++;
        this.selections.push("topRight");
        this.topRightButton.setFrame(1);
      }

      this.checkIfAllSelected();
    });

    this.farmLabel = this.add.image(0, 0, "rc_label").setOrigin(0, 0);
    this.farmLabel.x = this.topRightButton.x - this.topRightButton.width - 40;
    this.farmLabel.y = this.topRightButton.y + 8;
    this.farmLabel.setFrame(2);

    /*********************/

    this.bottomRightButton = this.add
      .sprite(0, 0, "ok-btn")
      .setFrame(0)
      .setScale(0.8)
      .setOrigin(1, 1);
    this.bottomRightButton.x = this.screenWidth;
    this.bottomRightButton.y = this.screenHeight;
    this.bottomRightButton.setInteractive();

    this.bottomRightButton.on("pointerdown", (pointer) => {
      if (this.selections.includes("bottomRight")) {
        this.selectionCounter--;
        this.selections.splice(this.selections.indexOf(1), 1);
        this.bottomRightButton.setFrame(0);
      } else {
        this.selectionCounter++;
        this.selections.push("bottomRight");
        this.bottomRightButton.setFrame(1);
      }

      this.checkIfAllSelected();
      //do something
    });

    this.factoryLabel = this.add.image(0, 0, "rc_label").setOrigin(1, 1);
    this.factoryLabel.x =
      this.screenWidth - this.bottomRightButton.width / 2 - 50;
    this.factoryLabel.y = this.screenHeight - 8;
    this.factoryLabel.setFrame(1);

    /*********************/

    this.bottomLeftButton = this.add
      .sprite(0, 0, "ok-btn")
      .setFrame(0)
      .setScale(0.8)
      .setOrigin(0, 1);
    this.bottomLeftButton.x = 0;
    this.bottomLeftButton.y = this.screenHeight;
    this.bottomLeftButton.setInteractive();

    this.bottomLeftButton.on("pointerdown", (pointer) => {
      if (this.selections.includes("bottomLeft")) {
        this.selectionCounter--;
        this.selections.splice(this.selections.indexOf(1), 1);
        this.bottomLeftButton.setFrame(0);
      } else {
        this.selectionCounter++;
        this.selections.push("bottomLeft");
        this.bottomLeftButton.setFrame(1);
      }

      this.checkIfAllSelected();
      //do something
    });

    this.excavatorLabel = this.add.image(0, 0, "rc_label").setOrigin(0, 1);
    this.excavatorLabel.x =
      this.bottomLeftButton.x + this.bottomLeftButton.width - 30;
    this.excavatorLabel.y = this.screenHeight - 8;
    this.excavatorLabel.setFrame(0);
  }

  createChatBubbles(blScores, brScores, trScores, tlScores) {
    const styles = {
      fill: "#FFEE43",
      font: "60px natlog",
      align: "left",
      wordWrap: { width: 150, useAdvancedWrap: false },
    };

    /*****************/

    let chatBubbleBL = this.add.sprite(0, 0, "rc_chat-bubbles").setOrigin(0, 1);
    chatBubbleBL.x = 0;
    chatBubbleBL.y = this.screenHeight - chatBubbleBL.height / 2;
    chatBubbleBL.setFrame(0);
    let textBL = this.add.text(0, 0, blScores, styles).setOrigin(0);
    textBL.x = chatBubbleBL.x + 70;
    textBL.y =
      chatBubbleBL.y - chatBubbleBL.height / 2 - textBL.height / 2 + 15;

    /*****************/

    let chatBubbleBR = this.add.sprite(0, 0, "rc_chat-bubbles").setOrigin(1, 1);
    chatBubbleBR.x = this.screenWidth;
    chatBubbleBR.y = this.screenHeight - chatBubbleBR.height / 2;
    chatBubbleBR.setFrame(1);
    let textBR = this.add.text(0, 0, brScores, styles).setOrigin(0);
    textBR.x = chatBubbleBR.x - chatBubbleBR.width + 50;
    textBR.y =
      chatBubbleBR.y - chatBubbleBR.height / 2 - textBR.height / 2 + 15;

    /*****************/

    let chatBubbleTR = this.add.sprite(0, 0, "rc_chat-bubbles").setOrigin(1, 0);
    chatBubbleTR.x = this.screenWidth;
    chatBubbleTR.y = chatBubbleTR.height / 2;
    chatBubbleTR.setFrame(2);
    let textTR = this.add
      .text(0, 0, trScores, styles)
      .setOrigin(0)
      .setAngle(180);
    textTR.x = chatBubbleTR.x - chatBubbleTR.width / 2 + textTR.width + 50;
    textTR.y =
      chatBubbleTR.y + chatBubbleTR.height / 2 + textTR.height / 2 - 15;

    /*****************/

    let chatBubbleTL = this.add.sprite(0, 0, "rc_chat-bubbles").setOrigin(0, 0);
    chatBubbleTL.x = 0;
    chatBubbleTL.y = chatBubbleTL.height / 2;
    chatBubbleTL.setFrame(3);
    let textTL = this.add
      .text(0, 0, tlScores, styles)
      .setOrigin(0)
      .setAngle(180);
    textTL.x = chatBubbleTL.x + chatBubbleTL.width / 2 + textTL.width + 100;
    textTL.y =
      chatBubbleTL.y + chatBubbleTL.height / 2 + textTL.height / 2 - 15;
  }

  createNavigationButtons() {
    this.backBtn = this.add.sprite(50, 50, "navigation-btn").setFrame(0);
    this.backBtn.setInteractive();

    this.backBtn.on("pointerdown", (pointer) => {
      this.scene.start("StartScene", {
        server: {},
        onGameOver: {},
      });
    });

    this.closeBtn = this.add
      .sprite(50, this.backBtn.y + this.backBtn.height + 10, "navigation-btn")
      .setFrame(1)
      .setInteractive();

    this.closeBtn.on("pointerdown", (pointer) => {
      this.scene.start("LoadingScene", {
        server: {},
        onGameOver: {},
      });
    });
  }

  checkIfAllSelected() {
    if (this.selections.length >= 4) {
      this.startNextScene();
    }
  }

  startNextScene() {
    this.scene.stop("RoundCompleteScene");
    this.scene.start("ChatTimeScene", {
      server: {},
      preScene: "RoundCompleteScene",
      onGameOver: {},
    });
  }
}
