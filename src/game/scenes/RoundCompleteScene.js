import { Scene } from "phaser";
import store from "../../store";

import label from "../../assets/img/take-position/labels-168x49.png";
import bg from "../../assets/img/common/game-bg-no-filter.png";

import board from "../../assets/img/round-summary/board.png";

import groupScoreText from "../../assets/img/round-summary/group-score.png";

import chatBubbles from "../../assets/img/round-summary/chatbubbles-441x163.png";

import starFrame from "../../assets/img/round-summary/star-frame.png";

import stars from "../../assets/img/round-summary/stars-39x38.png";

export default class RoundCompleteScene extends Scene {
  constructor() {
    super({
      key: "RoundCompleteScene",
    });
  }

  preload() {
    this.load.image(`bg`, bg);
    this.load.spritesheet(`label`, label, {
      frameWidth: 168,
      frameHeight: 49,
    });

    this.load.image(`board`, board);
    this.load.image(`group-score`, groupScoreText);
    this.load.image(`star-frame`, starFrame);

    this.load.spritesheet("chat-bubbles", chatBubbles, {
      frameWidth: 441,
      frameHeight: 163,
    });

    this.load.spritesheet("stars_", stars, {
      frameWidth: 39,
      frameHeight: 38,
    });
  }

  async create(data) {
    const { width, height } = this.scale;

    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.chats = [];
    this.currentChat = 1;
    this.chatCounter = 0;

    this.selectionCounter = 0;

    this.add.image(this.screenCenterX, this.screenCenterY, "bg").setOrigin(0.5);

    this.createBoard("group-score", 200, this.screenCenterY, 99, 2, false, 1);

    this.createBoard(
      "group-score",
      this.screenWidth - 200,
      this.screenCenterY,
      99,
      1,
      true,
      1
    );

    this.createChatBubbles("990", "99", "99", "0");

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
    let board = this.add.sprite(0, 0, "board").setScale(scaleFactor);
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

    let starFrame = this.add.image(0, 0, "star-frame").setScale(scaleFactor);
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
      fill: "#FFFFFF",
      font: "86px cursive",
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
        .sprite(0, 0, "stars_")
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
      this.topLeftButton.setFrame(1);
      this.selectionCounter++;

      this.checkIfAllSelected();
    });

    this.labLabel = this.add.image(0, 0, "label").setOrigin(0, 0);
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
      this.topRightButton.setFrame(1);
      this.selectionCounter++;

      this.checkIfAllSelected();
    });

    this.farmLabel = this.add.image(0, 0, "label").setOrigin(0, 0);
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
      this.bottomRightButton.setFrame(1);

      this.selectionCounter++;

      this.checkIfAllSelected();
      //do something
    });

    this.factoryLabel = this.add.image(0, 0, "label").setOrigin(1, 1);
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
      this.bottomLeftButton.setFrame(1);

      this.selectionCounter++;

      this.checkIfAllSelected();
      //do something
    });

    this.excavatorLabel = this.add.image(0, 0, "label").setOrigin(0, 1);
    this.excavatorLabel.x =
      this.bottomLeftButton.x + this.bottomLeftButton.width - 30;
    this.excavatorLabel.y = this.screenHeight - 8;
    this.excavatorLabel.setFrame(0);
  }

  createChatBubbles(blScores, brScores, trScores, tlScores) {
    const styles = {
      fill: "#FFFFFF",
      font: "60px cursive",
      align: "left",
      wordWrap: { width: 150, useAdvancedWrap: false },
    };

    /*****************/

    let chatBubbleBL = this.add.sprite(0, 0, "chat-bubbles").setOrigin(0, 1);
    chatBubbleBL.x = 0;
    chatBubbleBL.y = this.screenHeight - chatBubbleBL.height / 2;
    chatBubbleBL.setFrame(0);
    let textBL = this.add.text(0, 0, blScores, styles).setOrigin(0);
    textBL.x = chatBubbleBL.x + 70;
    textBL.y =
      chatBubbleBL.y - chatBubbleBL.height / 2 - textBL.height / 2 + 15;

    /*****************/

    let chatBubbleBR = this.add.sprite(0, 0, "chat-bubbles").setOrigin(1, 1);
    chatBubbleBR.x = this.screenWidth;
    chatBubbleBR.y = this.screenHeight - chatBubbleBR.height / 2;
    chatBubbleBR.setFrame(1);
    let textBR = this.add.text(0, 0, brScores, styles).setOrigin(0);
    textBR.x = chatBubbleBR.x - chatBubbleBR.width + 50;
    textBR.y =
      chatBubbleBR.y - chatBubbleBR.height / 2 - textBR.height / 2 + 15;

    /*****************/

    let chatBubbleTR = this.add.sprite(0, 0, "chat-bubbles").setOrigin(1, 0);
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

    let chatBubbleTL = this.add.sprite(0, 0, "chat-bubbles").setOrigin(0, 0);
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
    if (this.selectionCounter >= 4) {
      this.startNextScene();
    }
  }

  startNextScene() {
    this.scene.start("PlayScene", {
      server: {},
      onGameOver: {},
    });
  }
}
