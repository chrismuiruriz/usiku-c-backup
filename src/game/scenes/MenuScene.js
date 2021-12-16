import { Scene } from "phaser";

import menuButtons from "../../assets/img/menu/menu-buttons.png";

export default class MenuScene extends Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
  }

  preload() {
    this.load.spritesheet(`menu-buttons`, menuButtons, {
      frameWidth: 314,
      frameHeight: 64,
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

    this.add
      .image(this.screenCenterX, this.screenCenterY, "green-bg")
      .setOrigin(0.5);

    this.soundButtonClick = this.sound.add("s-button-click");

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
      this.soundButtonClick.play();
      this.startNextScene();
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
      this.soundButtonClick.play();
      this.goToScene("HowToPlayScene");
    });

    /**********************/

    this.quitGameBtn.on("pointerover", (pointer) => {
      this.quitGameBtn.setFrame(1);
    });

    this.quitGameBtn.on("pointerout", (pointer) => {
      this.quitGameBtn.setFrame(0);
    });

    this.quitGameBtn.on("pointerup", (pointer) => {
      this.soundButtonClick.play();
      this.goToScene("LoadingScene");
    });
  }

  createNavigationButtons() {
    this.closeBtn = this.add
      .sprite(50, 50, "navigation-btn")
      .setFrame(1)
      .setInteractive();

    this.closeBtn.on("pointerdown", (pointer) => {
      this.soundButtonClick.play();
      this.startNextScene();
    });
  }

  startNextScene() {
    this.scene.stop("MenuScene");
    this.scene.resume("PlayScene", {
      server: {},
      onGameOver: {},
    });
  }

  goToScene(scene) {
    this.scene.stop("PlayScene");
    this.scene.stop("MenuScene");
    this.scene.start(scene, {
      server: {},
      onGameOver: {},
    });
  }
}
