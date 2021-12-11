import { Scene } from "phaser";

export default class LoadingScene extends Scene {
  constructor() {
    super({ key: "LoadingScene" });
  }

  async create(data) {
    let styleConfig = {
      color: "#FFFFFF",
      fontSize: "18px",
      fontFamily: "'Bubblegum Sans', cursive",
      align: "center",
    };
    const { width, height } = this.scale;

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

    this.add.text(
      this.screenCenterX,
      gameLogo.y + gameLogo.height / 2 + 50,
      "LOADING...",
      styleConfig
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
    this.scene.stop("LoadingScene");
    this.scene.start("StartScene", {
      server: {},
      onGameOver: {},
    });
  }
}
