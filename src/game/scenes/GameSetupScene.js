import { Scene } from "phaser";

import gameSetUpBoard from "../../assets/img/setup/board.png";
import gameSetUpBoardTitle from "../../assets/img/setup/board-title.png";

export default class GameSetupScene extends Scene {
  constructor() {
    super({
      key: "GameSetupScene",
    });
  }

  preload() {
    this.load.image(`game-setup-board`, gameSetUpBoard);
    this.load.image(`game-setup-board-title`, gameSetUpBoardTitle);
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

    this.soundButtonClick = this.sound.add("s-button-click");

    this.board = this.add.sprite(
      this.screenCenterX,
      this.screenCenterY,
      "game-setup-board"
    );

    this.boardTitle = this.add.sprite(
      this.board.x,
      this.board.y - this.board.height / 2 + 10,
      "game-setup-board-title"
    );

    this.createText();

    this.startButton = this.add
      .sprite(this.screenCenterX, 617, "continue-btn")
      .setFrame(0);
    this.startButton.setInteractive();

    this.startButton.on("pointerover", (pointer) => {
      this.startButton.setFrame(1);
    });

    this.startButton.on("pointerout", (pointer) => {
      this.startButton.setFrame(0);
    });

    this.startButton.on("pointerup", (pointer) => {
      this.soundButtonClick.play();
      this.startButton.setFrame(1);
      this.startNextScene();
    });

    this.createNavigationButtons();
  }

  createText() {
    let styleConfig = {
      color: "#FFFFFF",
      fontSize: "34px",
      fontFamily: "'Bubblegum Sans', cursive",
      fontWeight: "Bold",
      align: "center",
    };

    // this.text2 = this.add.text(
    //   this.board.x,
    //   this.board.y - 20,
    //   "Take turns playing at each station",
    //   styleConfig
    // );

    this.text2 = this.add.bitmapText(
      this.board.x,
      this.board.y - 20,
      "natural-log",
      "Take turns playing at each station",
      38,
      Phaser.Display.Align.CENTER
    );
    this.text2.setOrigin(0.5);

    this.text1 = this.add.bitmapText(
      this.text2.x,
      this.text2.y - 100,
      "natural-log",
      "Work together to clean the river",
      38,
      Phaser.Display.Align.CENTER
    );
    this.text1.setOrigin(0.5);

    this.text3 = this.add.bitmapText(
      this.text2.x,
      this.text2.y + 100,
      "natural-log",
      "Play together on one device",
      38,
      Phaser.Display.Align.CENTER
    );
    this.text3.setOrigin(0.5);
  }

  createNavigationButtons() {
    this.backBtn = this.add.sprite(50, 50, "navigation-btn").setFrame(0);
    this.backBtn.setInteractive();

    this.backBtn.on("pointerdown", (pointer) => {
      this.soundButtonClick.play();
      this.scene.start("StoryScene", {
        server: {},
        onGameOver: {},
      });
    });

    this.closeBtn = this.add
      .sprite(50, this.backBtn.y + this.backBtn.height + 10, "navigation-btn")
      .setFrame(1)
      .setInteractive();

    this.closeBtn.on("pointerdown", (pointer) => {
      this.soundButtonClick.play();
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
    this.scene.stop("GameSetupScene");
  }
}
