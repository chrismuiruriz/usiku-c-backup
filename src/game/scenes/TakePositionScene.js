import { Scene } from "phaser";
import store from "../../store";

import label from "../../assets/img/take-position/labels-168x49.png";
import bg from "../../assets/img/take-position/take-position-bg.png";

import chatTop from "../../assets/img/take-position/chat-top.png";
import chatBottom from "../../assets/img/take-position/chat-bottom.png";

export default class TakePositionScene extends Scene {
  constructor() {
    super({
      key: "TakePositionScene",
    });
  }

  preload() {
    this.load.image(`bg`, bg);
    this.load.spritesheet(`label`, label, {
      frameWidth: 168,
      frameHeight: 49,
    });

    this.load.image(`chat-top`, chatTop);
    this.load.image(`chat-bottom`, chatBottom);
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

    //add temporary text

    let styleConfig = {
      fill: "#E6C43F",
      font: "bold 42px cursive",
      align: "center",
    };
    this.text1 = this.add
      .text(this.screenCenterX, 0, "TAKE YOUR POSITIONS!", styleConfig)
      .setOrigin(0.5)
      .setAngle(180);
    this.text1.y = this.screenCenterY - 30;

    this.text2 = this.add
      .text(this.screenCenterX, 0, "TAKE YOUR POSITIONS!", styleConfig)
      .setOrigin(0.5);
    this.text2.y = this.screenCenterY + 30;

    this.createChatBubbles();

    this.createButtons();
  }

  createChatBubbles() {
    this.add.image(this.screenCenterX, 0, "chat-top").setOrigin(0.5, 0);
    this.add
      .image(this.screenCenterX, this.screenHeight, "chat-bottom")
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
      "label"
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
      "label"
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
      "label"
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
      "label"
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
    this.scene.stop("TakePositionScene");
    this.scene.start("ChatTimeScene", {
      server: {},
      preScene: "TakePositionScene",
      onGameOver: {},
    });
  }
}
