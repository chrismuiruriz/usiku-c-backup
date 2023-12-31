import { Scene } from "phaser";

import tk_label from "../../assets/img/take-position/labels-168x49.png";
import tk_bg from "../../assets/img/take-position/take-position-bg.png";
import tk_text from "../../assets/img/take-position/take-position-text.png";

import chatTop from "../../assets/img/take-position/chat-top.png";
import chatBottom from "../../assets/img/take-position/chat-bottom.png";

export default class TakePositionScene extends Scene {
  constructor() {
    super({
      key: "TakePositionScene",
    });
  }

  preload() {
    this.load.image(`tk_bg`, tk_bg);
    this.load.spritesheet(`tk_label`, tk_label, {
      frameWidth: 168,
      frameHeight: 49,
    });

    this.load.image(`chat-top`, chatTop);
    this.load.image(`chat-bottom`, chatBottom);
    this.load.image(`tk_text`, tk_text);
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

    this.add
      .image(this.screenCenterX, this.screenCenterY, "tk_bg")
      .setOrigin(0.5);

    this.soundButtonClick = this.sound.add("s-button-click");

    //add temporary text

    let styleConfig = {
      fill: "#E6C43F",
      font: "bold 42px cursive",
      align: "center",
    };
    this.text1 = this.add
      .image(this.screenCenterX, this.screenCenterY, "tk_text")
      .setOrigin(0.5, 0)
      .setAngle(180);

    this.text2 = this.add
      .image(this.screenCenterX, this.screenCenterY, "tk_text")
      .setOrigin(0.5, 0);

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
      this.soundButtonClick.play();
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
      //do something
    });
    this.labLabel = this.add.image(
      this.topLeftButton.x,
      this.topLeftButton.y + this.topLeftButton.height / 2 + 30,
      "tk_label"
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
      this.soundButtonClick.play();
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
      //do something
    });
    this.farmLabel = this.add.image(
      this.topRightButton.x,
      this.topRightButton.y + this.topRightButton.height / 2 + 30,
      "tk_label"
    );
    this.farmLabel.setFrame(2);

    /*********************/

    this.bottomRightButton = this.add.sprite(0, 0, "ok-btn").setFrame(0);
    this.bottomRightButton.x = this.screenWidth - this.bottomRightButton.width;
    this.bottomRightButton.y =
      this.screenHeight - this.bottomRightButton.height;
    this.bottomRightButton.setInteractive();

    this.bottomRightButton.on("pointerdown", (pointer) => {
      this.soundButtonClick.play();
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
    this.factoryLabel = this.add.image(
      this.bottomRightButton.x,
      this.bottomRightButton.y + this.bottomRightButton.height / 2 + 30,
      "tk_label"
    );
    this.factoryLabel.setFrame(1);

    /*********************/

    this.bottomLeftButton = this.add.sprite(0, 0, "ok-btn").setFrame(0);
    this.bottomLeftButton.x = this.bottomLeftButton.width;
    this.bottomLeftButton.y = this.screenHeight - this.bottomLeftButton.height;
    this.bottomLeftButton.setInteractive();

    this.bottomLeftButton.on("pointerdown", (pointer) => {
      this.soundButtonClick.play();
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
    this.excavatorLabel = this.add.image(
      this.bottomLeftButton.x,
      this.bottomLeftButton.y + this.bottomLeftButton.height / 2 + 30,
      "tk_label"
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
    if (this.selections.length >= 4) {
      this.startNextScene();
    }
  }

  startNextScene() {
    this.scene.start("ChatTimeScene", {
      server: {},
      preScene: "TakePositionScene",
      onGameOver: {},
    });
    this.scene.stop("TakePositionScene");
  }
}
