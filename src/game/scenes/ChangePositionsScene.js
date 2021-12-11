import { Scene } from "phaser";

import cp_label from "../../assets/img/take-position/labels-168x49.png";
import cp_bg from "../../assets/img/change-position/change-position-bg.png";

import cp_chatTop from "../../assets/img/take-position/chat-top.png";
import cp_chatBottom from "../../assets/img/take-position/chat-bottom.png";

import cp_title from "../../assets/img/change-position/move-to-the-right.png";

export default class ChangePositionsScene extends Scene {
  constructor() {
    super({
      key: "ChangePositionsScene",
    });
  }

  preload() {
    this.load.image(`cp_bg`, cp_bg);
    this.load.spritesheet(`cp_label`, cp_label, {
      frameWidth: 168,
      frameHeight: 49,
    });

    this.load.image(`cp_chat-top`, cp_chatTop);
    this.load.image(`cp_chat-bottom`, cp_chatBottom);

    this.load.image(`cp_title`, cp_title);
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

    this.add
      .image(this.screenCenterX, this.screenCenterY, "cp_bg")
      .setOrigin(0.5);

    //add temporary text

    this.text1 = this.add
      .image(this.screenCenterX, 0, "cp_title")
      .setOrigin(0.5)
      .setAngle(180);
    this.text1.y = this.screenCenterY - this.text1.height / 2;

    this.text2 = this.add
      .image(this.screenCenterX, 0, "cp_title")
      .setOrigin(0.5);
    this.text2.y = this.screenCenterY + this.text2.height / 2;

    this.createChatBubbles();

    this.createButtons();
  }

  createChatBubbles() {
    this.add.image(this.screenCenterX, 0, "cp_chat-top").setOrigin(0.5, 0);
    this.add
      .image(this.screenCenterX, this.screenHeight, "cp_chat-bottom")
      .setOrigin(0.5, 1);
  }

  createButtons() {
    this.topLeftButton = this.add
      .sprite(0, 0, "ok-btn")
      .setFrame(0)
      .setAngle(180);
    this.topLeftButton.x = this.topLeftButton.width;
    this.topLeftButton.y = this.topLeftButton.height - 50;
    this.topLeftButton.setInteractive();

    this.topLeftButton.on("pointerdown", (pointer) => {
      this.topLeftButton.setFrame(1);
      this.selectionCounter++;

      this.checkIfAllSelected();
      //do something
    });
    this.labLabel = this.add.image(
      this.topLeftButton.x,
      this.topLeftButton.y + this.topLeftButton.height / 2 + 30,
      "cp_label"
    );
    this.labLabel.setFrame(3);

    /*********************/

    this.topRightButton = this.add
      .sprite(0, 0, "ok-btn")
      .setFrame(0)
      .setAngle(180);
    this.topRightButton.x = this.screenWidth - this.topRightButton.width;
    this.topRightButton.y = this.topRightButton.height - 50;
    this.topRightButton.setInteractive();

    this.topRightButton.on("pointerdown", (pointer) => {
      this.topRightButton.setFrame(1);
      this.selectionCounter++;

      this.checkIfAllSelected();
      //do something
    });
    this.farmLabel = this.add.image(
      this.topRightButton.x,
      this.topRightButton.y + this.topRightButton.height / 2 + 30,
      "cp_label"
    );
    this.farmLabel.setFrame(2);

    /*********************/

    this.bottomRightButton = this.add.sprite(0, 0, "ok-btn").setFrame(0);
    this.bottomRightButton.x = this.screenWidth - this.bottomRightButton.width;
    this.bottomRightButton.y =
      this.screenHeight - this.bottomRightButton.height;
    this.bottomRightButton.setInteractive();

    this.bottomRightButton.on("pointerdown", (pointer) => {
      this.bottomRightButton.setFrame(1);

      this.selectionCounter++;

      this.checkIfAllSelected();
      //do something
    });
    this.factoryLabel = this.add.image(
      this.bottomRightButton.x,
      this.bottomRightButton.y + this.bottomRightButton.height / 2 + 30,
      "cp_label"
    );
    this.factoryLabel.setFrame(1);

    /*********************/

    this.bottomLeftButton = this.add.sprite(0, 0, "ok-btn").setFrame(0);
    this.bottomLeftButton.x = this.bottomLeftButton.width;
    this.bottomLeftButton.y = this.screenHeight - this.bottomLeftButton.height;
    this.bottomLeftButton.setInteractive();

    this.bottomLeftButton.on("pointerdown", (pointer) => {
      this.bottomLeftButton.setFrame(1);

      this.selectionCounter++;

      this.checkIfAllSelected();
      //do something
    });
    this.excavatorLabel = this.add.image(
      this.bottomLeftButton.x,
      this.bottomLeftButton.y + this.bottomLeftButton.height / 2 + 30,
      "cp_label"
    );
    this.excavatorLabel.setFrame(0);
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
    this.scene.stop("ChangePositionsScene");
    this.scene.start("GameSummaryScene", {
      server: {},
      onGameOver: {},
    });
  }
}
