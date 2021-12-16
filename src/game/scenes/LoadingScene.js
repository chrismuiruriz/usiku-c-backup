import { Scene } from "phaser";

import GameState from "../data/GameState";

export default class LoadingScene extends Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  async create(data) {
    const { width, height } = this.scale;

    this.gameState = new GameState();

    //let's make sure we clear everything
    this.gameState.resetScores();

    this.screenWidth = this.cameras.main.width;
    this.screenHeight = this.cameras.main.height;

    this.screenCenterX = this.cameras.main.worldView.x + this.screenWidth / 2;
    this.screenCenterY = this.cameras.main.worldView.y + this.screenHeight / 2;

    this.add
      .image(this.screenCenterX, this.screenCenterY, "loading-scene-bg")
      .setOrigin(0.5);

    let gameLogo = this.add
      .image(0, this.screenCenterY, "game-logo")
      .setOrigin(0.5);
    gameLogo.x = this.screenCenterX - this.screenCenterX / 2;

    let kicdLogo = this.add
      .image(0, this.screenCenterY, "kicd-logo")
      .setOrigin(0.5);
    kicdLogo.x = this.screenCenterX + this.screenCenterX / 2;

    this.add.bitmapText(
      this.screenCenterX,
      gameLogo.y + gameLogo.height / 2 + 50,
      "alloyink",
      "LOADING...",
      24,
      Phaser.Display.Align.CENTER
    );

    this.time.delayedCall(
      2000,
      () => {
        this.startNextScene();
      },
      null,
      this
    );
  }

  startNextScene() {
    this.scene.start("StartScene", {
      server: {},
      onGameOver: {},
    });
    this.scene.stop("LoadingScene");
  }
}
