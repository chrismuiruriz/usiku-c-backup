import { Scene } from "phaser";
import store from "../../store";

import board from "../../assets/img/setup/board.png";

export default class GameSetupScene extends Scene {
  constructor() {
    super({
      key: "GameSetupScene",
    });
  }

  preload() {
    this.load.image(`board`, board);
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

    this.board = this.add.sprite(
      this.screenCenterX,
      this.screenCenterY,
      "board"
    );

    this.startButton = this.add
      .sprite(this.screenCenterX, 617, "continue-btn")
      .setFrame(0)
      .setScale(0.8);
    this.startButton.setInteractive();

    this.startButton.on("pointerover", (pointer) => {
      this.startButton.setFrame(1);
    });

    this.startButton.on("pointerout", (pointer) => {
      this.startButton.setFrame(0);
    });

    this.startButton.on("pointerup", (pointer) => {
      this.startButton.setFrame(1);
      this.startNextScene();
    });

    this.createNavigationButtons();
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
    this.scene.start("StoryScene", {
      server: {},
      onGameOver: {},
    });
  }
}
