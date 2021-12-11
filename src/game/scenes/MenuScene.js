import { Scene } from "phaser";
import store from "../../store";

import board from "../../assets/img/setup/board.png";
import boardTitle from "../../assets/img/setup/board-title.png";

import menuButtons from "../../assets/img/menu/menu-buttons.png";

export default class MenuScene extends Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
  }

  preload() {
    this.load.image(`board`, board);
    this.load.image(`board-title`, boardTitle);
    this.load.spritesheet(`menu-buttons`, menuButtons, {
      frameWidth: 314,
      frameHeight: 64,
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

    this.add
      .image(this.screenCenterX, this.screenCenterY, "green-bg")
      .setOrigin(0.5);

    this.createMenuButtons();

    this.createNavigationButtons();
  }

  createMenuButtons() {
    let yGap = 50;

    this.returnToGameBtn = this.add
      .sprite(this.screenCenterX, 150, "menu-buttons", 0)
      .setInteractive()
      .setFrame(6);

    this.volumeBtn = this.add
      .sprite(
        this.screenCenterX,
        this.returnToGameBtn.y + this.returnToGameBtn.height + yGap,
        "menu-buttons",
        0
      )
      .setInteractive()
      .setFrame(2);

    this.showInstructionsBtn = this.add
      .sprite(
        this.screenCenterX,
        this.volumeBtn.y + this.volumeBtn.height + yGap,
        "menu-buttons",
        0
      )
      .setInteractive()
      .setFrame(4);

    this.quitGameBtn = this.add
      .sprite(
        this.screenCenterX,
        this.showInstructionsBtn.y + this.showInstructionsBtn.height + yGap,
        "menu-buttons",
        0
      )
      .setInteractive()
      .setFrame(0);

    this.setEventListeners();
  }

  setEventListeners() {
    this.returnToGameBtn.on("pointerover", (pointer) => {
      this.returnToGameBtn.setFrame(7);
    });

    this.returnToGameBtn.on("pointerout", (pointer) => {
      this.returnToGameBtn.setFrame(6);
    });

    this.returnToGameBtn.on("pointerup", (pointer) => {
      //TODO:: Return to game
    });

    /**********************/

    this.volumeBtn.on("pointerup", (pointer) => {
      this.volumeBtn.setFrame(2);
    });

    this.volumeBtn.on("pointerdown", (pointer) => {
      this.volumeBtn.setFrame(3);
    });

    /**********************/

    this.showInstructionsBtn.on("pointerover", (pointer) => {
      this.showInstructionsBtn.setFrame(5);
    });

    this.showInstructionsBtn.on("pointerout", (pointer) => {
      this.showInstructionsBtn.setFrame(4);
    });

    this.showInstructionsBtn.on("pointerup", (pointer) => {
      //TODO:: Show instructions
    });

    /**********************/

    this.quitGameBtn.on("pointerover", (pointer) => {
      this.quitGameBtn.setFrame(1);
    });

    this.quitGameBtn.on("pointerout", (pointer) => {
      this.quitGameBtn.setFrame(0);
    });

    this.quitGameBtn.on("pointerup", (pointer) => {
      //TODO:: Close game
    });
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

  startNextScene() {
    this.scene.start("TakePositionScene", {
      server: {},
      onGameOver: {},
    });
  }
}
