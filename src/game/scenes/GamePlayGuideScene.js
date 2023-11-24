import { Scene } from "phaser";

import menuButtons from "../../assets/img/menu/menu-buttons.png";

export default class GamePlayGuideScene extends Scene {
  constructor() {
    super({
      key: "GamePlayGuideScene",
    });
  }

  preload() {
    this.load.spritesheet(`menu-buttons`, menuButtons, {
      frameWidth: 314,
      frameHeight: 64,
    });
  }

  async create() {
    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.add
      .image(this.screenCenterX, this.screenCenterY, "game-play-guide")
      .setOrigin(0.5);

    this.soundButtonClick = this.sound.add("s-button-click");

    this.createNavigationButtons();
  }

  createNavigationButtons() {
    this.closeBtn = this.add
      .sprite(50, 50, "navigation-btn")
      .setFrame(1)
      .setInteractive();

    this.closeBtn.on("pointerdown", () => {
      this.soundButtonClick.play();
      this.startNextScene();
    });
  }

  startNextScene() {
    this.scene.stop("GamePlayGuideScene");
    this.scene.resume("PlayScene", {
      server: {},
      onGameOver: {},
    });
  }
}
